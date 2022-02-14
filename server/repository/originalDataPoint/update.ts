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
  } = params

  const schemaName = Schemas.getNameCycle(assessment, assessmentCycle)

  await client.oneOrNone<OriginalDataPoint | null>(
    `
        update ${schemaName}.original_data_point set
          country_iso = $1,
          year = $2,
          data_source_additional_comments = $3::jsonb,
          data_source_methods = $4,
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
      dataSourceMethods,
      dataSourceReferences,
      description,
      nationalClasses,
      id,
    ]
  )

  return getOne({ assessment, assessmentCycle, odpId: id }, client)
}
