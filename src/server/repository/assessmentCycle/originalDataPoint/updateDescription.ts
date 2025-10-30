import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import {
  ODP_COMMENT_COLUMN_EXTENT,
  ODP_COMMENT_COLUMN_FOREST_CHARACTERISTICS,
  OriginalDataPoint,
  OriginalDataPointCommentKey,
} from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { OriginalDataPointAdapter } from 'server/repository/adapter'

import { getOne } from './getOne'

export const updateDescription = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    field: OriginalDataPointCommentKey
    originalDataPoint: OriginalDataPoint
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const {
    assessment,
    cycle,
    field,
    originalDataPoint: { comments, countryIso, id, year },
  } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)
  const columnName =
    field === TableNames.extentOfForest ? ODP_COMMENT_COLUMN_EXTENT : ODP_COMMENT_COLUMN_FOREST_CHARACTERISTICS
  const value = comments?.[field] ?? ''

  await client.one<OriginalDataPoint>(
    `
      update ${schemaName}.original_data_point
      set ${columnName} = $2
      where id = $1
      returning *
  `,
    [id, value],
    OriginalDataPointAdapter
  )

  return getOne({ assessment, cycle, countryIso, year: String(year) }, client)
}
