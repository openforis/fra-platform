import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { OriginalDataPointAdapter } from 'server/repository/adapter/originalDataPoint'

import { ODPCommentColumns } from './commentColumns'

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

  const commentColumnExtent = ODPCommentColumns[TableNames.extentOfForest]
  const commentColumnForestCharacteristics = ODPCommentColumns[TableNames.forestCharacteristics]

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
