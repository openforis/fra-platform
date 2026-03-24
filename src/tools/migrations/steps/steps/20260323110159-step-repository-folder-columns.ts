import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

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
}
