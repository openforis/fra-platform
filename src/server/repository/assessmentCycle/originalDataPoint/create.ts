import { Objects } from 'utils/objects'

import { Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

export const create = async (
  params: {
    assessment: Assessment
    cycle: Cycle
    originalDataPoint: OriginalDataPoint
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const {
    assessment,
    cycle,
    originalDataPoint: {
      countryIso,
      year,
      dataSourceAdditionalComments,
      dataSourceMethods,
      dataSourceReferences,
      description,
      nationalClasses,
      values,
    },
  } = params

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  return client.one<OriginalDataPoint>(
    `
        insert into ${schemaName}.original_data_point (
          country_iso,
          year,
          data_source_additional_comments,
          data_source_methods,
          data_source_references,
          description,
          national_classes,
          values
        ) values ($1, $2, $3, $4::jsonb, $5, $6, $7::jsonb, $8::jsonb) returning *;`,
    [
      countryIso,
      year,
      dataSourceAdditionalComments || '',
      dataSourceMethods ? JSON.stringify(dataSourceMethods) : '[]',
      dataSourceReferences || '',
      description || '',
      nationalClasses ? JSON.stringify(nationalClasses) : '[]',
      values ? JSON.stringify(values) : '{}',
    ],
    Objects.camelize
  )
}
