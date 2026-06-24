import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { TableName } from 'meta/assessment/table'
import { UUID } from 'meta/uuid/uuid'

export type ValidationStatus = {
  valid: boolean
}

export type ValidationSummarySubsection = ValidationStatus & {
  sectionName: SectionName
  tableNames: Array<TableName>
}

export type ValidationSummarySection = ValidationStatus & {
  subsections: Record<UUID, ValidationSummarySubsection>
}

export type ValidationSummaryDescription = Record<CommentableDescriptionName, ValidationStatus>

export type ValidationSummary = {
  descriptions: Record<SectionName, ValidationSummaryDescription>
  nationalDataPoints: Record<SectionName, ValidationStatus>
  sections: Record<UUID, ValidationSummarySection>
  subsections: Record<UUID, ValidationSummarySubsection>
  tables: Record<TableName, ValidationStatus>
}
