import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

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

  const hasDescription = await _columnExists({ client, columnName: 'description', schemaName })
  if (hasDescription) {
    await client.none(`alter table ${tableName} rename column description to comments_extent_of_forest`)
  }

  const hasExtentOfForestComments = await _columnExists({
    client,
    columnName: 'comments_extent_of_forest',
    schemaName,
  })

  if (!hasExtentOfForestComments) {
    throw new Error(`Column comments_extent_of_forest not found in ${tableName}`)
  }

  const hasForestCharacteristicsComments = await _columnExists({
    client,
    columnName: 'comments_forest_characteristics',
    schemaName,
  })

  if (!hasForestCharacteristicsComments) {
    await client.none(`alter table ${tableName} add column comments_forest_characteristics text`)
  }

  await client.none(`update ${tableName} set comments_forest_characteristics = comments_extent_of_forest`)
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
