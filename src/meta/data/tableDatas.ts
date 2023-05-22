import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { AssessmentName, CycleName, NodeValue, NodeValueValidations, TableName } from '@meta/assessment'

import { RecordAssessmentData, RecordColumnData, RecordCountryData, TableData } from './tableData'

type PropsDeprecated = {
  data: TableData | RecordCountryData
  countryIso: CountryIso
  tableName: string
  variableName: string
  colName: string
}

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  data: RecordAssessmentData
  countryIso: CountryIso
  tableName: string
  variableName: string
  colName: string
}

const getTableData = (
  props: Pick<Props, 'assessmentName' | 'cycleName' | 'countryIso' | 'tableName' | 'data'>
): RecordColumnData => {
  const { assessmentName, cycleName, countryIso, tableName, data } = props
  return data?.[assessmentName]?.[cycleName]?.[countryIso]?.[tableName] ?? {}
}

const isTableDataEmpty = (props: {
  assessmentName: AssessmentName
  cycleName: CycleName
  data: RecordAssessmentData
  tableName: TableName
  countryIso: CountryIso
}) => {
  const { assessmentName, cycleName, data, tableName, countryIso } = props
  const tableData = getTableData({ assessmentName, cycleName, data, tableName, countryIso })
  if (Objects.isEmpty(tableData)) {
    return true
  }

  return !Object.values(tableData)
    .flatMap(
      (rows) => Object.values(rows).filter((nodeValue) => !nodeValue.calculated && nodeValue.raw !== null).length
    )
    .every(Boolean)
}

const getNodeValue = (props: Props): NodeValue => {
  const { assessmentName, cycleName, data, countryIso, tableName, variableName, colName } = props
  const tableData = getTableData({ assessmentName, cycleName, data, countryIso, tableName })
  if (!colName) return null
  return tableData[colName]?.[variableName] ?? ({} as NodeValue)
}

const getDatum = (props: Props): string | undefined => {
  return getNodeValue(props)?.raw
}

/**
 * @deprecated
 */
const updateDatum = (props: PropsDeprecated & { value: NodeValue }): TableData => {
  const { data, countryIso, tableName, variableName, colName, value } = props
  const dataClone = { ...data }
  if (!dataClone[countryIso]) dataClone[countryIso] = {}
  if (!dataClone[countryIso][tableName]) dataClone[countryIso][tableName] = {}
  if (!dataClone[countryIso][tableName][colName]) dataClone[countryIso][tableName][colName] = {}
  dataClone[countryIso][tableName][colName][variableName] = value
  return <TableData>dataClone
}

const updateRecordAssessmentData = (
  props: Omit<PropsDeprecated, 'data'> & {
    value: NodeValue
    data: RecordAssessmentData
    assessmentName: AssessmentName
    cycleName: CycleName
  }
): RecordAssessmentData => {
  const { assessmentName, cycleName, data, countryIso, tableName, variableName, colName, value } = props
  const dataClone = { ...data }
  if (!dataClone[assessmentName]) dataClone[assessmentName] = {}
  if (!dataClone[assessmentName][cycleName]) dataClone[assessmentName][cycleName] = {}
  if (!dataClone[assessmentName][cycleName][countryIso]) dataClone[assessmentName][cycleName][countryIso] = {}
  if (!dataClone[assessmentName][cycleName][countryIso][tableName])
    dataClone[assessmentName][cycleName][countryIso][tableName] = {}
  if (!dataClone[assessmentName][cycleName][countryIso][tableName][colName])
    dataClone[assessmentName][cycleName][countryIso][tableName][colName] = {}
  dataClone[assessmentName][cycleName][countryIso][tableName][colName][variableName] = value

  return dataClone
}

const updateRecordAssessmentDataValidation = (
  props: Omit<PropsDeprecated, 'data'> & {
    data: RecordAssessmentData
    assessmentName: AssessmentName
    cycleName: CycleName
  } & Pick<NodeValue, 'validation'>
): RecordAssessmentData => {
  const { validation } = props
  const value = getNodeValue(props)
  return updateRecordAssessmentData({ ...props, value: { ...value, validation } })
}

/**
 * Merge new table data with existing table data
 * @param props - newTableData, tableData
 * @returns merged table data
 */

const mergeRecordAssessmentData = (props: { newTableData: RecordAssessmentData; tableData: RecordAssessmentData }) => {
  const { newTableData, tableData } = props

  return Object.keys(newTableData).reduce((accAssessment, assessmentName: AssessmentName) => {
    return {
      ...accAssessment,
      [assessmentName]: Object.keys(newTableData[assessmentName]).reduce(
        (accCycle, cycleName: CycleName) => ({
          ...accCycle,
          [cycleName]: Object.keys(newTableData[assessmentName][cycleName]).reduce(
            (accCountry, countryIso: CountryIso) => ({
              ...accCountry,
              [countryIso]: Object.keys(newTableData[assessmentName][cycleName][countryIso]).reduce(
                (accTable, tableName: string) => ({
                  ...accTable,
                  [tableName]: newTableData[assessmentName][cycleName][countryIso][tableName],
                }),
                tableData[assessmentName][cycleName][countryIso] ?? {}
              ),
            }),
            tableData[assessmentName][cycleName] ?? {}
          ),
        }),
        tableData[assessmentName] ?? {}
      ),
    }
  }, tableData)
}

const hasErrors = (
  props: Pick<Props, 'assessmentName' | 'cycleName' | 'countryIso' | 'tableName' | 'data'>
): boolean => {
  const { assessmentName, cycleName, countryIso, tableName, data } = props
  const tableData = getTableData({ assessmentName, cycleName, countryIso, tableName, data })
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

  updateRecordAssessmentData,
  updateRecordAssessmentDataValidation,
  mergeRecordAssessmentData,

  isTableDataEmpty,
}
