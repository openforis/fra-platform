import { Label } from '@meta/assessment'

export interface DataSourceVariable {
  value: string
  label: Label
  prefixLabel?: Label
}

export interface DataSourceDescriptionTable {
  variables: Array<DataSourceVariable>
  typeOfDataSourceText?: boolean
}

export interface DataSourceDescription {
  table?: DataSourceDescriptionTable
  text?: { readOnly?: boolean }
}
