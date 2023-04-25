import { Label, VariableName } from '@meta/assessment'

export interface DataSourceVariables {
  // Custom i18n keys to include
  include: Array<string>
  prefixes?: Record<VariableName, Label>
}
