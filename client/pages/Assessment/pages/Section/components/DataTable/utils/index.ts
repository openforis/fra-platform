import { Col, Row, Table } from '@meta/assessment'
import { TableData } from '@meta/data'
import { CountryIso } from '@meta/area'

const _getDataTable = (data: TableData, countryIso: CountryIso, table: Table) => data[countryIso][table.props.name]

export const getHeaders = (data: TableData, countryIso: CountryIso, table: Table): string[] => {
  const dataTable = _getDataTable(data, countryIso, table)
  if (!dataTable) return []
  return Object.keys(Object.values(dataTable)[0])
}

export const getDatum = (data: TableData, countryIso: CountryIso, table: Table, row: Row, col: Col) => {
  const dataTable = _getDataTable(data, countryIso, table)
  if (!dataTable) return null
  const { colName } = col.props
  if (!colName) return null
  // const rowName = Objects.camelize(row.props.variableName)
  const { variableName } = row.props
  return data[countryIso]?.[table.props.name]?.[variableName]?.[colName]?.raw
}
