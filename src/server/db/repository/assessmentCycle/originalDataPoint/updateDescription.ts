import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint, OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB } from 'server/db/db'
import { getOne } from 'server/db/repository/assessmentCycle/originalDataPoint/getOne'
import { ODPCommentColumns } from 'server/db/repository/assessmentCycle/originalDataPoint/commentColumns'
import { OriginalDataPointAdapter } from 'server/db/repository/adapter/originalDataPoint'
import { Schemas } from 'server/db/schemas'

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
  const columnName = ODPCommentColumns[field]
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
