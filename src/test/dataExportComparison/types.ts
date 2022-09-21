import { CountryIso } from '@meta/area'
import { NodeValue } from '@meta/assessment'

export type TableName = string
export type VariableName = string
export type ColName = string
export type VariableLegacy = { name: string; exportName: string }

export type MetadataLegacy = Record<TableName, { columns: Array<string>; variables: Array<VariableLegacy> }>
export type MetadataLocal = Record<TableName, { columns: Array<ColName>; variables: Array<VariableName> }>

export type DataLegacy = Record<CountryIso, Record<VariableName, Record<ColName, string>>>
export type DataLocal = Record<CountryIso, Record<TableName, Record<ColName, Record<VariableName, NodeValue>>>>

export type ValueDiff = {
  countryIso: CountryIso
  tableName: TableName
  variableName: VariableName
  colName: ColName
  valueLegacy: string
  valueLocal: string
}
