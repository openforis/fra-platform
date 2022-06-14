import { CountryIso } from '@meta/area'
import { NodeValue } from '@meta/assessment'

import { TableData } from './tableData'

type Props = { data: TableData; countryIso: CountryIso; tableName: string; variableName: string; colName: string }

const getTableData = (props: Partial<Props>) => {
  const { countryIso, tableName, data } = props

  return data?.[countryIso]?.[tableName] || {}
}

const getNodeValue = (props: Props): NodeValue => {
  const { data, countryIso, tableName, variableName, colName } = props
  const tableData = getTableData({ data, countryIso, tableName })
  if (!colName) return null
  return tableData[colName]?.[variableName] || ({} as NodeValue)
}

const getDatum = (props: Props) => {
  return getNodeValue(props)?.raw
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
