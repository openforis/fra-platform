import { BaseProtocol, DB, Schemas } from '@server/db'
import { Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'
import { getOne } from './getOne'

export const update = async (
  params: { assessment: Assessment; assessmentCycle: Cycle; originalDataPoint: OriginalDataPoint },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint | null> => {
  const {
    assessment,
    assessmentCycle,
    originalDataPoint: { countryIso, id, year },
  } = params

  const schemaName = Schemas.getNameCycle(assessment, assessmentCycle)

  await client.oneOrNone<OriginalDataPoint | null>(
    `
        update ${schemaName}.original_data_point set
                      country_iso = $1,
                      year = $2
        where id = $3
        returning *
    `,
    [countryIso, year, id]
  )

  return getOne({ assessment, assessmentCycle, odpId: id }, client)
}
