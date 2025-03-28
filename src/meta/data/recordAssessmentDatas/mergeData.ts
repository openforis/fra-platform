/**
 * Merge new table data with existing table data
 * @param props - newTableData, tableData
 * @returns merged table data
 */
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { RecordAssessmentData } from '../RecordAssessmentData'

export const mergeData = (props: { newTableData: RecordAssessmentData; tableData: RecordAssessmentData }) => {
  const { newTableData, tableData } = props

  Object.keys(newTableData).forEach((assessmentName: AssessmentName) => {
    Object.keys(newTableData[assessmentName]).forEach((cycleName: CycleName) => {
      Object.keys(newTableData[assessmentName][cycleName]).forEach((countryIso: CountryIso) => {
        Object.keys(newTableData[assessmentName][cycleName][countryIso]).forEach((tableName) => {
          const path = [assessmentName, cycleName, countryIso, tableName]
          const value = newTableData[assessmentName][cycleName][countryIso][tableName]
          Objects.setInPath({ obj: tableData, path, value })
        })
      })
    })
  })

  return tableData
}
