import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { NodeValue, NodeValueValidations } from '@meta/assessment'

import { TableData } from './tableData'

type Props = {
  data: TableData
  countryIso: CountryIso
  tableName: string
  variableName: string
  colName: string
}

const getTableData = (props: Pick<Props, 'countryIso' | 'tableName' | 'data'>) => {
  const { countryIso, tableName, data } = props

  return data?.[countryIso]?.[tableName] ?? {}
}

// Exclude calculated nodes
type Options = {
  excludeNull: boolean
}

const isTableDataEmpty = (props: { data: TableData; tableName: string; countryIso: CountryIso; options?: Options }) => {
  const { data, tableName, countryIso, options } = props
  const tableData = getTableData({ data, tableName, countryIso })
  if (Objects.isEmpty(tableData)) {
    return true
  }

  const _comparator = (nodeValue: NodeValue) => {
    return options?.excludeNull ? !nodeValue.calculated && nodeValue.raw !== null : !nodeValue.calculated
  }
  return !Object.values(tableData)
    .flatMap((rows) => Object.values(rows).filter((nodeValue) => _comparator(nodeValue)).length)
    .every(Boolean)
}

const getNodeValue = (props: Props): NodeValue => {
  const { data, countryIso, tableName, variableName, colName } = props
  const tableData = getTableData({ data, countryIso, tableName })
  if (!colName) return null
  return tableData[colName]?.[variableName] ?? ({} as NodeValue)
}

const getDatum = (props: Props) => {
  return getNodeValue(props)?.raw
}

const updateDatum = (props: Props & { value: NodeValue }): TableData => {
  const { data, countryIso, tableName, variableName, colName, value } = props
  const dataClone = { ...data }
  if (!dataClone[countryIso]) dataClone[countryIso] = {}
  if (!dataClone[countryIso][tableName]) dataClone[countryIso][tableName] = {}
  if (!dataClone[countryIso][tableName][colName]) dataClone[countryIso][tableName][colName] = {}
  dataClone[countryIso][tableName][colName][variableName] = value
  return dataClone
}

const hasErrors = (props: Pick<Props, 'countryIso' | 'tableName' | 'data'>): boolean => {
  const { countryIso, tableName, data } = props
  const tableData = getTableData({ countryIso, tableName, data })
  return Object.values(tableData).some((values) => {
    return Object.values(values).some((value) => !NodeValueValidations.isValid(value))
  })
}

export const TableDatas = {
  getDatum,
  getNodeValue,
  getTableData,
  hasErrors,
  updateDatum,
  isTableDataEmpty,
}
