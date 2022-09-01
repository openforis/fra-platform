import { CountryIso } from '@meta/area'
import { NodeValue } from '@meta/assessment'

// countryIso -> tableName -> variableName -> year -> colName -> NodeValue
export type TableData = Record<CountryIso, Record<string, Record<string, Record<string, NodeValue>>>>
