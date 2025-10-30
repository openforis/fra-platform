import { Promises } from 'utils/promises'

import { AssessmentNames } from 'meta/assessment/assessment'
import { ODP_COMMENT_COLUMN_EXTENT, ODP_COMMENT_COLUMN_FOREST_CHARACTERISTICS } from 'meta/assessment/originalDataPoint'

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

  const hasDescription = await _columnExists({ client, columnName: 'description', schemaName })
  if (hasDescription) {
    await DB.none(`alter table ${tableName} rename column description to ${ODP_COMMENT_COLUMN_EXTENT}`)
  }

  const hasExtentOfForestComments = await _columnExists({
    client,
    columnName: ODP_COMMENT_COLUMN_EXTENT,
    schemaName,
  })

  if (!hasExtentOfForestComments) {
    throw new Error(`Column ${ODP_COMMENT_COLUMN_EXTENT} not found in ${tableName}`)
  }

  const hasForestCharacteristicsComments = await _columnExists({
    client,
    columnName: ODP_COMMENT_COLUMN_FOREST_CHARACTERISTICS,
    schemaName,
  })

  if (!hasForestCharacteristicsComments) {
    await DB.none(`alter table ${tableName} add column ${ODP_COMMENT_COLUMN_FOREST_CHARACTERISTICS} text`)
    await client.none(
      `update ${tableName} set ${ODP_COMMENT_COLUMN_FOREST_CHARACTERISTICS} = ${ODP_COMMENT_COLUMN_EXTENT}`
    )
  }
}

export default async (client: BaseProtocol): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    if (assessment.props.name === AssessmentNames.panEuropean) return
    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaName = Schemas.getNameCycle(assessment, cycle)
      await _updateOriginalDataPointTable({ client, schemaName })
    })
  })
}
