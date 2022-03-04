import { BaseProtocol, DB, Schemas } from '@server/db'
import { Assessment, Cycle, OriginalDataPoint } from '@meta/assessment'
import { getOne } from './getOne'

export const update = async (
  props: { assessment: Assessment; assessmentCycle: Cycle; originalDataPoint: OriginalDataPoint },
  client: BaseProtocol = DB
): Promise<OriginalDataPoint> => {
  const {
    assessment,
    assessmentCycle,
    originalDataPoint: {
      id,
      countryIso,
      year,
      dataSourceAdditionalComments,
      dataSourceMethods,
      dataSourceReferences,
      description,
      nationalClasses,
    },
  } = props

  const schemaName = Schemas.getNameCycle(assessment, assessmentCycle)

  await client.one<OriginalDataPoint>(
    `
        update ${schemaName}.original_data_point set
          country_iso = $1,
          year = $2,
          data_source_additional_comments = $3,
          data_source_methods = $4::jsonb,
          data_source_references = $5,
          description = $6,
          national_classes = $7::jsonb
        where id = $8
        returning *
    `,
    [
      countryIso,
      year,
      dataSourceAdditionalComments,
      JSON.stringify(dataSourceMethods),
      dataSourceReferences,
      description,
      JSON.stringify(nationalClasses),
      id,
    ]
  )

  return getOne({ assessment, assessmentCycle, odpId: id }, client)
}
