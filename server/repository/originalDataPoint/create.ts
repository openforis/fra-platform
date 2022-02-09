import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'

export const create = async (
  params: {
    assessment: Assessment
    assessmentCycle: Cycle
    originalDataPoint: Pick<OriginalDataPoint, 'countryIso' | 'year'>
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const { assessment, assessmentCycle, originalDataPoint } = params

  const schemaName = Schemas.getNameCycle(assessment, assessmentCycle)
  return client.one<OriginalDataPoint>(
    `insert into ${schemaName}.original_data_point (country_iso, year) values ($1, $2) returning *;`,
    [originalDataPoint.countryIso, originalDataPoint.year],
    Objects.camelize
  )
}
