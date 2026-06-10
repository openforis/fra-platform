import { Label } from 'meta/assessment/label'

export type DataSourceLinkedVariable = {
  assessmentName: string
  cycleName: string
  sectionName: string
  tableName: string
  variableName: string
}

export interface DataSourceVariable {
  variableName: string
  label: Label
  prefixLabel?: Label
}

export interface DataSourceDescriptionTable {
  // if true render text field, otherwise predefined list of options
  typeOfDataSourceText?: boolean
  // If variables is not specified, render a free text field
  variables?: Array<DataSourceVariable>
  // // If years is not specified, do not render years column
  // include?: {
  //   years?: boolean
  //   variables?: boolean
  // }
  //
  // columns: Partial<
  //   Record<keyof DataSource, { type?: 'text'; include?: boolean; variables?: Array<DataSourceVariable> }>
  // >
}

export interface DataSourceDescription {
  linkedVariables?: Array<DataSourceLinkedVariable>
  table?: DataSourceDescriptionTable
  text?: { readOnly?: boolean }
}
