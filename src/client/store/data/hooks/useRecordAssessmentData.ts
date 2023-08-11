import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { TableName, TableNames } from 'meta/assessment'
import { RecordAssessmentData, RecordAssessmentDatas, RecordTableData } from 'meta/data'

import { useAssessmentCountry } from 'client/store/area'
import { useAssessment, useCycle } from 'client/store/assessment'
import { useOriginalDataPointData } from 'client/store/data/hooks/useOriginalDataPointData'
import { useAppSelector } from 'client/store/store'

export const useRecordAssessmentData = (): RecordAssessmentData => useAppSelector((state) => state.data.tableData)

export const useRecordAssessmentDataWithOdp = (): RecordAssessmentData => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const country = useAssessmentCountry()
  const data = useRecordAssessmentData()
  const { countryIso } = country
  const odpData = useOriginalDataPointData()

  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  return useMemo<RecordAssessmentData>(() => {
    if (Objects.isEmpty(odpData)) return data

    const tableNames = Object.keys(
      RecordAssessmentDatas.getCountryData({ assessmentName, cycleName, countryIso, data })
    )
    const reducer = (recordTableDataAcc: RecordTableData, tableName: TableName): RecordTableData => {
      const recordTableData = { ...recordTableDataAcc }
      const props = { assessmentName, cycleName, countryIso, tableName, data }
      recordTableData[tableName] = RecordAssessmentDatas.getTableData(props)

      const hasOdp =
        tableName === TableNames.extentOfForest ||
        (tableName === TableNames.forestCharacteristics && country.props.forestCharacteristics.useOriginalDataPoint)
      if (hasOdp) {
        recordTableData[tableName] = { ...recordTableData[tableName], ...odpData }
      }

      return recordTableData
    }

    return {
      [assessmentName]: {
        ...(data[assessmentName] || {}),
        [cycleName]: {
          ...(data[assessmentName][cycleName] || {}),
          [countryIso]: {
            ...(data[assessmentName][cycleName][countryIso] || {}),
            ...tableNames.reduce<RecordTableData>(reducer, {}),
          },
        },
      },
    }
  }, [assessmentName, country.props.forestCharacteristics.useOriginalDataPoint, countryIso, cycleName, data, odpData])
}
