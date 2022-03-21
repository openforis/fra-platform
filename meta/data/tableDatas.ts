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
  const { variableName } = row.props
  return data[countryIso][table.props.name]?.[colName]?.[variableName]
}

const getDatum = (props: { data: TableData; countryIso: CountryIso; table: Table; row: Row; col: Col }) => {
  const { data, countryIso, table, row, col } = props
  return getNodeValue({ col, countryIso, data, row, table })?.raw
}

// TODO: make this smarter
const updateDatum = (props: {
  data: TableData
  countryIso: CountryIso
  tableName: string
  variableName: string
  colName: string
  value: NodeValue
}): TableData => {
  const { data, countryIso, tableName, variableName, colName, value } = props
  if (!data?.[countryIso]?.[tableName]?.[variableName]?.[colName]) return data
  const newData = {
    ...data,
  }
  newData[countryIso][tableName][colName][variableName] = value
  return newData
}

export const TableDatas = {
  getTableData,
  getDatum,
  getNodeValue,
  updateDatum,
}
