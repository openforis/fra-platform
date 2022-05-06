import { CountryIso } from '@meta/area'
import { Col, NodeValue, Row, Table } from '@meta/assessment'

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

const updateDatum = (props: {
  data: TableData
  countryIso: CountryIso
  tableName: string
  variableName: string
  colName: string
  value: NodeValue
}): TableData => {
  const { data, countryIso, tableName, variableName, colName, value } = props
  const dataClone = { ...data }
  if (!dataClone[countryIso]) dataClone[countryIso] = {}
  if (!dataClone[countryIso][tableName]) dataClone[countryIso][tableName] = {}
  if (!dataClone[countryIso][tableName][colName]) dataClone[countryIso][tableName][colName] = {}
  dataClone[countryIso][tableName][colName][variableName] = value
  return dataClone
}

export const TableDatas = {
  getDatum,
  getNodeValue,
  getTableData,
  updateDatum,
}
