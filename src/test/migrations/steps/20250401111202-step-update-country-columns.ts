import { AssessmentStatus } from 'meta/area'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Cycle } from 'meta/assessment/cycle'

import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/controller/cache'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { CountrySummaryRepository } from 'server/repository/assessmentCycle/countrySummary'
import {
  activitiesLastEdit,
  activitiesLastEditOdpData,
} from 'server/repository/assessmentCycle/countrySummary/_lastEditActivities'

const originalQuery = (schemaCycle: string, cycle: Cycle) => `
 with country as
               (select c.country_iso, c.status as status
                from ${schemaCycle}.country c),
           last_edit as
               (select c.country_iso, max(a.time) as last_edit
                from country c
                         left join public.activity_log a
                                   on c.country_iso = a.country_iso
                where a.cycle_uuid = '${cycle.uuid}'
                  and a.message in (${activitiesLastEdit})
                group by 1)
           , last_edit_odp_data as
                (select c.country_iso, max(a.time) as last_edit_odp_data
                from country c
                         left join public.activity_log a
                                   on c.country_iso = a.country_iso
                where a.cycle_uuid = '${cycle.uuid}'
                  and a.message in (${activitiesLastEditOdpData})
                group by 1)
           , last_review as
                (select c.country_iso
                      , a.message
                      , max(a.time) filter ( where a.target ->> 'status' = '${AssessmentStatus.review}' )   as last_in_review
                      , max(a.time) filter ( where a.target ->> 'status' = '${AssessmentStatus.approval}' ) as last_for_approval
                      , max(a.time) filter ( where a.target ->> 'status' = '${AssessmentStatus.accepted}' ) as last_accepted
                 from country c
                          left join public.activity_log a
                                    on c.country_iso = a.country_iso
                 where a.cycle_uuid = '${cycle.uuid}'
                   and a.section = 'assessment'
                   and a.message = '${ActivityLogMessage.assessmentStatusUpdate}'
                 group by 1, 2)
      select c.country_iso
           , le.last_edit
           , leo.last_edit_odp_data
           , lr.last_in_review
           , lr.last_for_approval
           , lr.last_accepted
           , greatest(le.last_edit
               , leo.last_edit_odp_data
               , lr.last_in_review
               , lr.last_for_approval
               , lr.last_accepted)                      as last_update
      from country c
               left join last_edit le on c.country_iso = le.country_iso
               left join last_edit_odp_data leo on c.country_iso = leo.country_iso
               left join last_review lr on c.country_iso = lr.country_iso
`

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promise.all(
    assessments.map(async (assessment) => {
      return Promise.all(
        assessment.cycles.map(async (cycle) => {
          const schemaName = Schemas.getNameCycle(assessment, cycle)

          await DB.query(
            `alter table ${schemaName}.country
                add column last_update timestamptz,
                add column last_edit timestamptz,
                add column last_edit_odp timestamptz,
                add column last_in_editing timestamptz,
                add column last_in_review timestamptz,
                add column last_in_approval timestamptz,
                add column last_in_accepted timestamptz
                ;`
          )

          // Populate: last_edit, last_edit_odp, last_in_review, last_in_approval, last_in_accepted, last_update
          await DB.query(
            `
            with cs as (
                ${originalQuery(schemaName, cycle)}
            )
            update ${schemaName}.country c
            set
              last_edit = cs.last_edit,
              last_edit_odp = cs.last_edit_odp_data,
              last_in_review = cs.last_in_review,
              last_in_approval = cs.last_for_approval,
              last_in_accepted = cs.last_accepted,
              last_update = cs.last_update
            from cs
            where c.country_iso = cs.country_iso;`
          )

          // Either manual status update OR first activitiesLastEdit
          // We should take it from the first editing time
          // Populate: last_in_editing: find the last status: editing
          await DB.query(
            `update ${schemaName}.country c
            set last_in_editing = coalesce(
              -- If there is a status update, take the last one
              (
                select max(a.time)
                from public.activity_log a
                where c.country_iso = a.country_iso
                  and a.cycle_uuid = $1
                  and a.section = 'assessment'
                  and a.message = $2
                  and a.target ->> 'status' = $3
              ),
              -- Otherwise, take the first editing activity
              (
                select min(a.time)
                from public.activity_log a
                where c.country_iso = a.country_iso
                  and a.cycle_uuid = $1
                  and a.message in (${activitiesLastEdit})
              )
            );`,
            [cycle.uuid, ActivityLogMessage.assessmentStatusUpdate, AssessmentStatus.editing]
          )
          await CountrySummaryRepository.dropMaterializedView({ assessment, cycle }, client)
          await CountrySummaryRepository.createMaterializedView({ assessment, cycle }, client)

          await CacheController.generateArea({ assessment, cycle }, client)
        })
      )
    })
  )
}
