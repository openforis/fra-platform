/**
 * Merge new table data with existing table data
 * @param props - newTableData, tableData
 * @returns merged table data
 */
import { CountryIso } from 'meta/area'
import { AssessmentName, CycleName } from 'meta/assessment'

import { RecordAssessmentData } from '../RecordAssessmentData'

export const mergeData = (props: { newTableData: RecordAssessmentData; tableData: RecordAssessmentData }) => {
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
                tableData[assessmentName]?.[cycleName]?.[countryIso] ?? {}
              ),
            }),
            tableData[assessmentName]?.[cycleName] ?? {}
          ),
        }),
        tableData[assessmentName] ?? {}
      ),
    }
  }, tableData)
}
