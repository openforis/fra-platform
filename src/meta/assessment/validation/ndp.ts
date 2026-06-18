import { OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
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

export type NDPDataSourceValidationField = 'reference' | 'type' | 'comments'

export type NDPDataSourceValidation = Partial<Record<NDPDataSourceValidationField, Validation>>

export type NDPValidation = {
  comments?: Partial<Record<OriginalDataPointCommentKey, Validation>>
  dataSources?: Record<UUID, NDPDataSourceValidation>
  nationalClasses?: Record<UUID, NDPNationalClassValidation>
  year?: Validation
}

export type RecordNDPValidations = Record<UUID, NDPValidation>
