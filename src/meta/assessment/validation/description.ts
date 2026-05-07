import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Validation } from 'meta/assessment/validation/validation'

export type DescriptionValidations = Partial<Record<CommentableDescriptionName, Validation>>

export type RecordDescriptionValidations = Record<SectionName, DescriptionValidations>
