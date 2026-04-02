import { TableName } from 'meta/assessment/table'
import { UUID } from 'meta/uuid/uuid'

export type ValidationStatus = {
  valid: boolean
}

export type ValidationSummarySubsection = ValidationStatus & {
  tableNames: Array<TableName>
}

export type ValidationSummarySection = ValidationStatus & {
  subsections: Record<UUID, ValidationSummarySubsection>
}

export type ValidationSummary = {
  sections: Record<UUID, ValidationSummarySection>
  subsections: Record<UUID, ValidationSummarySubsection>
  tables: Record<TableName, ValidationStatus>
}
