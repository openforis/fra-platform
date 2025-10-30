import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import {
  ODP_COMMENT_COLUMN_EXTENT,
  ODP_COMMENT_COLUMN_FOREST_CHARACTERISTICS,
  OriginalDataPoint,
} from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { OriginalDataPointAdapter } from 'server/repository/adapter'

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

  return client.map<OriginalDataPoint>(
    `
        select * from ${schemaName}.original_data_point
        where coalesce(${ODP_COMMENT_COLUMN_EXTENT}, '') ilike '%href%'
           or coalesce(${ODP_COMMENT_COLUMN_FOREST_CHARACTERISTICS}, '') ilike '%href%'
    `,
    [],
    OriginalDataPointAdapter
  )
}
