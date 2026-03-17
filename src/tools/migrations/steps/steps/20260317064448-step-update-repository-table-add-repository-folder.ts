import { tableExists } from 'tools/migrations/steps/steps/utils/tableExists'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { getRepositoryFolderDDL } from 'server/db/repository/assessment/assessment/getCreateSchemaDDL'
import { Schemas } from 'server/db/schemas'

const _updateSchema = async (schemaName: string, client: BaseProtocol): Promise<void> => {
  await client.none(getRepositoryFolderDDL(schemaName))
  await client.none(`
    alter table ${schemaName}.repository
      add column description text,
      add column folder_uuid uuid references ${schemaName}.repository_folder (uuid) on update cascade on delete set null,
      add column created_at timestamptz not null default now()
  `)
}

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promise.all(
    assessments.map(async (assessment) => {
      await Promise.all(
        assessment.cycles.map(async (cycle) => {
          const schemaName = Schemas.getNameCycle(assessment, cycle)
          // do nothing if table exists already
          const { exists } = await tableExists({ schema: schemaName, tableName: 'repository_folder' }, client)
          if (exists) return
          await _updateSchema(schemaName, client)
        })
      )
    })
  )
}
