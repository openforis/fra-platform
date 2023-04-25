import { Label, VariableName } from '@meta/assessment'

/**
 * @deprecated
 */
export interface DataSourceVariables {
  // Custom i18n keys to include
  include: Array<string>
  prefixes?: Record<VariableName, Label>
}
