import { Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { getOne } from './getOne'

export const updateOriginalData = async (
  props: { assessment: Assessment; cycle: Cycle; originalDataPoint: OriginalDataPoint },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const {
    assessment,
    cycle,
    originalDataPoint: { id, countryIso, year, nationalClasses, values },
  } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  await client.one<OriginalDataPoint>(
    `
        update ${schemaName}.original_data_point set
          national_classes = $2::jsonb,
          values = $3::jsonb
        where id = $1
        returning *
    `,
    [id, JSON.stringify(nationalClasses), values]
  )

  return getOne({ assessment, cycle, countryIso, year: String(year) }, client)
}
