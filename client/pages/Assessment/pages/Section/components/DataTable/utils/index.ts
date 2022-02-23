import { Col, Row, Table } from '@meta/assessment'
import { TableData } from '@meta/data'
import { CountryIso } from '@meta/area'
import { Objects } from '@core/utils'

const _getDataTable = (data: TableData, countryIso: CountryIso, table: Table) => data[countryIso][table.props.name]

export const getHeaders = (data: TableData, countryIso: CountryIso, table: Table) => {
  const dataTable = _getDataTable(data, countryIso, table)
  if (!dataTable) return []
  return Object.keys(Object.values(dataTable)[0])
}

export const getDatum = (data: TableData, countryIso: CountryIso, table: Table, row: Row, col: Col) => {
  const dataTable = _getDataTable(data, countryIso, table)
  if (!dataTable) return null
  const { colName } = col.props
  if (!colName) return null
  const rowName = Objects.camelize(row.props.variableName)
  return data[countryIso][table.props.name][rowName][colName].raw
}
