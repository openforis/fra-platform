import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

const _migrateCreatedAt = (
  assessment: Assessment,
  cycle: Cycle,
  prevCycle: Cycle | undefined,
  client: BaseProtocol
): Promise<void> => {
  const schema = Schemas.getNameCycle(assessment, cycle)
  const prevSchema = prevCycle ? Schemas.getNameCycle(assessment, prevCycle) : null
  const cycleCreatedAt = cycle.props.dateCreated

  const prevFallback = prevSchema
    ? `(select prev.created_at from ${prevSchema}.repository prev where prev.uuid = r.uuid limit 1),
       (select prev.created_at from ${prevSchema}.repository prev where r.file_uuid is not null and prev.file_uuid = r.file_uuid limit 1),
       (select prev.created_at from ${prevSchema}.repository prev where r.link is not null and prev.link = r.link limit 1),`
    : ''

  // NOTE: Slow query!
  return client.none(
    `update ${schema}.repository r
     set created_at = coalesce(by_uuid.time, by_file_uuid.time, by_file.time, by_filename.time, ${prevFallback} $(cycleCreatedAt)::timestamptz)
     from ${schema}.repository r2
         
     left join lateral (
       select min(al.time) as time
       from public.activity_log al
       where al.message = $(message)
         and al.target->>'uuid' = r2.uuid::text
     ) by_uuid on true
         
     left join lateral (
       select min(al.time) as time
       from public.activity_log al
       where al.message = $(message)
         and al.country_iso is not distinct from r2.country_iso
         and al.target->>'file' = r2.props->'translation'->>'en'
     ) by_file on true
         
     left join lateral (
       select min(al.time) as time
       from public.activity_log al
       where al.message = $(message)
         and al.country_iso is not distinct from r2.country_iso
         and al.target->>'fileName' = r2.props->'translation'->>'en'
     ) by_filename on true
         
     left join lateral (
       select min(al.time) as time
       from public.activity_log al
       join public.file f on f.name = coalesce(al.target->>'file', al.target->>'fileName')
       where al.message = $(message)
         and al.country_iso is not distinct from r2.country_iso
         and f.uuid = r2.file_uuid
     ) by_file_uuid on true
     
     where r2.uuid = r.uuid`,
    { cycleCreatedAt, message: ActivityLogMessage.repositoryItemCreate }
  )
}

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  // Add columns for all cycles in parallel (idempotent DDL).
  await Promise.all(
    assessments.flatMap((assessment) =>
      assessment.cycles.map((cycle) => {
        const schema = Schemas.getNameCycle(assessment, cycle)
        return Promise.all([
          client.none(`alter table ${schema}.repository add column if not exists folder_name varchar`),
          client.none(
            `alter table ${schema}.repository add column if not exists parent_uuid uuid references ${schema}.repository(uuid) on delete set null`
          ),
          client.none(`alter table ${schema}.repository add column if not exists description text`),
          client.none(
            `alter table ${schema}.repository add column if not exists created_at timestamptz not null default now()`
          ),
        ])
      })
    )
  )

  // Migrate created_at
  await Promise.all(
    assessments.map((assessment) =>
      Promises.each(assessment.cycles, (cycle, i) =>
        _migrateCreatedAt(assessment, cycle, assessment.cycles[i - 1], client)
      )
    )
  )
}
