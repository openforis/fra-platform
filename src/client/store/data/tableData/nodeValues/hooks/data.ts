import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { TableName, TableNames } from 'meta/assessment/table'
import { RecordAssessmentData, RecordAssessmentDatas, RecordTableData } from 'meta/data'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useOriginalDataPointData } from 'client/store/data/tableData/nodeValues/hooks/originalDataPointData'
import { NodeValuesSelectors } from 'client/store/data/tableData/nodeValues/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useRecordAssessmentData = (): RecordAssessmentData =>
  useAppSelector(NodeValuesSelectors.getRecordAssessmentData)

export const useRecordAssessmentDataWithOdp = (): RecordAssessmentData => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  const country = useAssessmentCountry()
  const data = useRecordAssessmentData()
  const odpData = useOriginalDataPointData()

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

    const path = [assessmentName, cycleName, countryIso]
    const newTableData = Objects.setInPath({ obj: {}, path, value: tableNames.reduce<RecordTableData>(reducer, {}) })

    const tableData = Objects.cloneDeep(data)

    return RecordAssessmentDatas.mergeData({ newTableData, tableData })
  }, [assessmentName, country.props.forestCharacteristics.useOriginalDataPoint, countryIso, cycleName, data, odpData])
}
