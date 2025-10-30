import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { OriginalDataPointAdapter } from 'server/repository/adapter'

import { ODP_COMMENT_COLUMNS_RECORD } from './commentColumns'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getManyWithDescriptionLinks = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Array<OriginalDataPoint>> => {
  const { assessment, cycle } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  const commentColumnExtent = ODP_COMMENT_COLUMNS_RECORD[TableNames.extentOfForest]
  const commentColumnForestCharacteristics = ODP_COMMENT_COLUMNS_RECORD[TableNames.forestCharacteristics]

  return client.map<OriginalDataPoint>(
    `
        select * from ${schemaName}.original_data_point
        where coalesce(${commentColumnExtent}, '') ilike '%href%'
           or coalesce(${commentColumnForestCharacteristics}, '') ilike '%href%'
    `,
    [],
    OriginalDataPointAdapter
  )
}
