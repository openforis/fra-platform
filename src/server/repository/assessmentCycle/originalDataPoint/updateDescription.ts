import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint, OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB, Schemas } from 'server/db'

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
  const value = comments?.[field] ?? ''
  const path = `{${field}}`

  await client.one<OriginalDataPoint>(
    `
      update ${schemaName}.original_data_point
      set comments = jsonb_set(coalesce(comments, '{}'::jsonb), $2::text[], to_jsonb($3::text), true)
      where id = $1
      returning *
  `,
    [id, path, value]
  )

  return getOne({ assessment, cycle, countryIso, year: String(year) }, client)
}
