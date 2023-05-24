import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { AssessmentName, CycleName, NodeValue, NodeValueValidations, TableName } from '@meta/assessment'
import { RecordAssessmentData, RecordColumnData } from '@meta/data/RecordAssessmentData'

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
  return data?.[assessmentName]?.[cycleName]?.[countryIso]?.[tableName] ?? ({} as RecordColumnData)
}

const hasErrors = (props: {
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  tableName: TableName
  data: RecordAssessmentData
}): boolean => {
  const { assessmentName, cycleName, countryIso, tableName, data } = props
  const tableData = getTableData({ assessmentName, cycleName, countryIso, tableName, data })
  return Object.values(tableData).some((values) => {
    return Object.values(values).some((value) => !NodeValueValidations.isValid(value))
  })
}

const isTableDataEmpty = (props: {
  assessmentName: AssessmentName
  countryIso: CountryIso
  cycleName: CycleName
  data: RecordAssessmentData
  tableName: TableName
}): boolean => {
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
/**
 * Merge new table data with existing table data
 * @param props - newTableData, tableData
 * @returns merged table data
 */

const mergeData = (props: { newTableData: RecordAssessmentData; tableData: RecordAssessmentData }) => {
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

const getNodeValue = (props: Props): NodeValue => {
  const { assessmentName, cycleName, data, countryIso, tableName, variableName, colName } = props
  const tableData = getTableData({ assessmentName, cycleName, data, countryIso, tableName })
  if (!colName) return null
  return tableData[colName]?.[variableName] ?? ({} as NodeValue)
}

const getDatum = (props: Props): string | undefined => {
  return getNodeValue(props)?.raw
}

const updateDatum = (
  props: Props & {
    value: NodeValue
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

const updateDatumValidation = (props: Props & Pick<NodeValue, 'validation'>): RecordAssessmentData => {
  const { validation } = props
  const value = getNodeValue(props)
  return updateDatum({ ...props, value: { ...value, validation } })
}

export const RecordAssessmentDatas = {
  getDatum,
  getNodeValue,
  getTableData,
  hasErrors,
  isTableDataEmpty,
  mergeData,

  updateDatum,
  updateDatumValidation,
}
