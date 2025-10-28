import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

import { getOne } from './getOne'

export const updateDescription = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    originalDataPoint: OriginalDataPoint
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const {
    assessment,
    cycle,
    originalDataPoint: { countryIso, description, id, year },
  } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  await client.one<OriginalDataPoint>(
    `
      update ${schemaName}.original_data_point
      set description = $2
      where id = $1
      returning *
  `,
    [id, description]
  )

  return getOne({ assessment, cycle, countryIso, year: String(year) }, client)
}
