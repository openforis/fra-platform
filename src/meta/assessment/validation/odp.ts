import { OriginalDataPointCommentKey } from 'meta/assessment/originalDataPoint'
import { Validation } from 'meta/assessment/validation/validation'
import { UUID } from 'meta/uuid/uuid'

export type ODPNationalClassValidationField =
  | 'name'
  | 'area'
  | 'extentOfForestPercentage'
  | 'forestCharacteristicsPercentage'
  | 'forestPlantationIntroducedPercentage'
  | 'primaryForest'

export type ODPNationalClassValidation = Partial<Record<ODPNationalClassValidationField, Validation>>

export type ODPDataSourceValidationField = 'reference' | 'type' | 'comments'

export type ODPDataSourceValidation = Partial<Record<ODPDataSourceValidationField, Validation>>

export type ODPValidation = {
  comments?: Partial<Record<OriginalDataPointCommentKey, Validation>>
  dataSources?: Record<UUID, ODPDataSourceValidation>
  nationalClasses?: Record<UUID, ODPNationalClassValidation>
  year?: Validation
}

export type RecordODPValidations = Record<UUID, ODPValidation>
