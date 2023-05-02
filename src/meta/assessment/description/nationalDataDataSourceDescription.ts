import { Label } from '@meta/assessment'

export interface DataSourceVariable {
  variableName: string
  label: Label
  prefixLabel?: Label
}

export interface DataSourceDescriptionTable {
  // If variables is not specified, render a free text field
  variables?: Array<DataSourceVariable>
  typeOfDataSourceText?: boolean
}

export interface DataSourceDescription {
  table?: DataSourceDescriptionTable
  text?: { readOnly?: boolean }
}
