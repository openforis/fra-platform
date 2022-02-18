import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'

export const create = async (
  params: {
    assessment: Assessment
    assessmentCycle: Cycle
    originalDataPoint: OriginalDataPoint
  },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const {
    assessment,
    assessmentCycle,
    originalDataPoint: {
      countryIso,
      year,
      dataSourceAdditionalComments,
      dataSourceMethods,
      dataSourceReferences,
      description,
      nationalClasses,
    },
  } = params

  const schemaName = Schemas.getNameCycle(assessment, assessmentCycle)
  return client.one<OriginalDataPoint>(
    `
        insert into ${schemaName}.original_data_point (
          country_iso,
          year,
          data_source_additional_comments,
          data_source_methods,
          data_source_references,
          description,
          national_classes
        ) values ($1, $2, $3, $4::jsonb, $5, $6, $7::jsonb) returning *;`,
    [
      countryIso,
      year,
      dataSourceAdditionalComments,
      JSON.stringify(dataSourceMethods),
      dataSourceReferences,
      description,
      JSON.stringify(nationalClasses),
    ],
    Objects.camelize
  )
}
