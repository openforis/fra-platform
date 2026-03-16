import { SectionName } from 'meta/assessment/section'
import { TableName } from 'meta/assessment/table'
import { UUID } from 'meta/uuid/uuid'

export type ValidationSummaryTableRecord = Record<TableName, boolean>

export type ValidationSummarySubSection = {
  hasErrors: boolean
  tables: ValidationSummaryTableRecord
}

export type ValidationSummarySection = {
  hasErrors: boolean
  subSections: Record<SectionName, ValidationSummarySubSection>
}

export type ValidationSummary = {
  hasErrors: boolean
  sections: Record<UUID, ValidationSummarySection>
}
