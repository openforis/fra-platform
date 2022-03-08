import { CountryIso } from '@meta/area'
import { Table, Row, Col, NodeValue } from '@meta/assessment'
import { TableData } from './tableData'

const getTableData = (props: { data: TableData; countryIso: CountryIso; table: Table }) => {
  const { countryIso, table, data } = props
  return data[countryIso][table.props.name]
}

const getNodeValue = (props: {
  data: TableData
  countryIso: CountryIso
  table: Table
  row: Row
  col: Col
}): NodeValue => {
  const { data, countryIso, table, row, col } = props
  const dataTable = getTableData({ data, countryIso, table })
  if (!dataTable) return null
  const { colName } = col.props
  if (!colName) return null
  // const rowName = Objects.camelize(row.props.variableName)
  const { variableName } = row.props
  return data[countryIso][table.props.name]?.[variableName]?.[colName]
}

const getDatum = (props: { data: TableData; countryIso: CountryIso; table: Table; row: Row; col: Col }) => {
  const { data, countryIso, table, row, col } = props
  return getNodeValue({ col, countryIso, data, row, table })?.raw
}

export const TableDatas = {
  getTableData,
  getDatum,
  getNodeValue,
}
