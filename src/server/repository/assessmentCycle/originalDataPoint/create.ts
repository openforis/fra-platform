import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import {
  ODP_COMMENT_COLUMN_EXTENT,
  ODP_COMMENT_COLUMN_FOREST_CHARACTERISTICS,
  OriginalDataPoint,
} from 'meta/assessment/originalDataPoint'
import { TableNames } from 'meta/assessment/table'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { OriginalDataPointAdapter } from 'server/repository/adapter'

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
      comments,
      countryIso,
      dataSourceAdditionalComments,
      dataSourceMethods,
      dataSourceReferences,
      nationalClasses,
      values,
      year,
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
          ${ODP_COMMENT_COLUMN_EXTENT},
          ${ODP_COMMENT_COLUMN_FOREST_CHARACTERISTICS},
          national_classes,
          values
        ) values ($1, $2, $3, $4::jsonb, $5, $6, $7, $8::jsonb, $9::jsonb) returning *;`,
    [
      countryIso,
      year,
      dataSourceAdditionalComments || '',
      dataSourceMethods ? JSON.stringify(dataSourceMethods) : '[]',
      dataSourceReferences || '',
      comments?.[TableNames.extentOfForest] ?? '',
      comments?.[TableNames.forestCharacteristics] ?? '',
      nationalClasses ? JSON.stringify(nationalClasses) : '[]',
      values ? JSON.stringify(values) : '{}',
    ],
    OriginalDataPointAdapter
  )
}
