import { AssessmentStatus } from 'meta/area'
import { ActivityLogMessage } from 'meta/assessment/activityLog'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { activitiesLastEdit } from 'server/repository/assessmentCycle/countrySummary/_lastEditActivities'

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
            `update ${schemaName}.country c
            set
              last_edit = cs.last_edit,
              last_edit_odp = cs.last_edit_odp_data,
              last_in_review = cs.last_in_review,
              last_in_approval = cs.last_for_approval,
              last_in_accepted = cs.last_accepted,
              last_update = cs.last_update
            from ${schemaName}.country_summary cs
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
        })
      )
    })
  )
}
