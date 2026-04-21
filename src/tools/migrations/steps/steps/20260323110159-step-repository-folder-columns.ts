import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Cycle } from 'meta/assessment/cycle'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

const _migrateCreatedAt = (cycle: Cycle, schema: string, client: BaseProtocol): Promise<void> =>
  client.none(
    `update ${schema}.repository r
     set created_at = al.time
     from public.activity_log al
     where al.message = $(message)
       and al.cycle_uuid = $(cycleUuid)
       and al.target->>'uuid' = r.uuid::text`,
    { cycleUuid: cycle.uuid, message: ActivityLogMessage.repositoryItemCreate }
  )

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promise.all(
    assessments.flatMap((assessment) =>
      assessment.cycles.map(async (cycle) => {
        const schema = Schemas.getNameCycle(assessment, cycle)
        await Promise.all([
          client.none(`alter table ${schema}.repository add column if not exists folder_name varchar`),
          client.none(
            `alter table ${schema}.repository add column if not exists parent_uuid uuid references ${schema}.repository(uuid) on delete set null`
          ),
          client.none(`alter table ${schema}.repository add column if not exists description text`),
          client.none(
            `alter table ${schema}.repository add column if not exists created_at timestamptz not null default now()`
          ),
        ])
        await _migrateCreatedAt(cycle, schema, client)
      })
    )
  )
}
