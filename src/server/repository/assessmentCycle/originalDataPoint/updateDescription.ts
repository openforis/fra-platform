import { Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

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
    originalDataPoint: { id, countryIso, year, description },
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
