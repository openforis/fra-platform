import { Promises } from 'utils/promises'

import { TableNames } from 'meta/assessment/table'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB, Schemas } from 'server/db'

const TABLE = 'original_data_point'

type ColumnExistsProps = {
  client: BaseProtocol
  columnName: string
  schemaName: string
}

const _columnExists = async (props: ColumnExistsProps): Promise<boolean> => {
  const { client, columnName, schemaName } = props

  const query = `
    select column_name
    from information_schema.columns
    where table_schema = $1
      and table_name = $2
      and column_name = $3
  `

  const record = await client.oneOrNone<{ column_name: string }>(query, [schemaName, TABLE, columnName])

  return Boolean(record)
}

type UpdateTableProps = {
  client: BaseProtocol
  schemaName: string
}

const _updateOriginalDataPointTable = async (props: UpdateTableProps): Promise<void> => {
  const { client, schemaName } = props
  const tableName = `${schemaName}.${TABLE}`

  const hasComments = await _columnExists({ client, columnName: 'comments', schemaName })
  if (!hasComments) {
    await DB.query(`alter table ${tableName} add column comments jsonb not null default '{}'::jsonb`)
  }

  const hasDescription = await _columnExists({ client, columnName: 'description', schemaName })
  if (hasDescription) {
    await DB.none(`
        update ${tableName}
        set comments = jsonb_strip_nulls(
          jsonb_build_object(
            '${TableNames.extentOfForest}',
            description,
            '${TableNames.forestCharacteristics}',
            description
          )
        )
        where description is not null
    `)
    await DB.query(`alter table ${tableName} drop column description`)
  }
}

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) =>
    Promises.each(assessment.cycles, async (cycle) => {
      const schemaName = Schemas.getNameCycle(assessment, cycle)
      await _updateOriginalDataPointTable({ client, schemaName })
    })
  )
}
