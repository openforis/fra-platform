import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import type { SectionName } from 'meta/assessment/section'
import type { Validation } from 'meta/assessment/validation/validation'
import type { UUID } from 'meta/uuid/uuid'

export type DescriptionTextValidations = Partial<Record<CommentableDescriptionName, Validation>>

export type DataSourceValidationField = 'reference' | 'type' | 'variables' | 'year'

export type DataSourceValidation = Partial<Record<DataSourceValidationField, Validation>>

export type DataSourceRowValidations = Record<UUID, DataSourceValidation>

export type SectionDescriptionValidations = {
  descriptions?: DescriptionTextValidations
  dataSources?: DataSourceRowValidations
}

export type RecordDescriptionValidations = Record<SectionName, SectionDescriptionValidations>
