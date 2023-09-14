import { Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

import { getOne } from './getOne'

export const updateDataSources = async (
  props: { assessment: Assessment; cycle: Cycle; originalDataPoint: OriginalDataPoint },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const {
    assessment,
    cycle,
    originalDataPoint: { id, countryIso, year, dataSourceAdditionalComments, dataSourceMethods, dataSourceReferences },
  } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  await client.one<OriginalDataPoint>(
    `
        update ${schemaName}.original_data_point set
          data_source_additional_comments = $2,
          data_source_methods = $3::jsonb,
          data_source_references = $4
        where id = $1
        returning *
    `,
    [id, dataSourceAdditionalComments, JSON.stringify(dataSourceMethods), dataSourceReferences]
  )

  return getOne({ assessment, cycle, countryIso, year: String(year) }, client)
}
