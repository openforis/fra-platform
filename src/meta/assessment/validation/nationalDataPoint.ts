import type { DataSourceEditableField } from 'meta/assessment/descriptionValue/dataSource'
import { OriginalDataPoint, OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
import { Validation } from 'meta/assessment/validation/validation'
import { UUID } from 'meta/uuid/uuid'

export type NDPNationalClassValidationField =
  | 'name'
  | 'area'
  | 'extentOfForestPercentage'
  | 'forestCharacteristicsPercentage'
  | 'forestPlantationIntroducedPercentage'
  | 'primaryForest'

export type NDPNationalClassValidation = Partial<Record<NDPNationalClassValidationField, Validation>>

export type NDPDataSourceValidationField = Extract<DataSourceEditableField, 'comments' | 'reference' | 'type'>

export type NDPDataSourceValidation = Partial<Record<NDPDataSourceValidationField, Validation>>

export type NDPValidation = {
  comments?: Partial<Record<OriginalDataPointCommentKey, Validation>>
  // Reference link validation of the ndp's single data source, for cycles using ndp dataSources v1.
  // In v2 cycles each data source is validated separately, keyed by its uuid in dataSources.
  dataSourceReference?: Validation
  dataSources?: Record<UUID, NDPDataSourceValidation>
  nationalClasses?: Record<UUID, NDPNationalClassValidation>
  odpId?: OriginalDataPoint['id']
  year?: Validation
}

export type RecordNDPValidations = Record<UUID, NDPValidation>
