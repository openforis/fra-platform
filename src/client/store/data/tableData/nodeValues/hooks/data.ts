import { useEffect, useMemo, useState } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { TableName, TableNames } from 'meta/assessment/table'
import { TableSection } from 'meta/assessment/tableSection'
import { RecordAssessmentData, RecordAssessmentDatas, RecordColumnData, RecordTableData } from 'meta/data'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { NodeValuesSelectors } from 'client/store/data/tableData/nodeValues/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useRecordAssessmentData = (): RecordAssessmentData =>
  useAppSelector(NodeValuesSelectors.getRecordAssessmentData)

export const useOriginalDataPointData = (): RecordColumnData => {
  const tableName = TableNames.originalDataPointValue
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) => {
    const data = NodeValuesSelectors.getRecordAssessmentData(state)
    return RecordAssessmentDatas.getTableData({ assessmentName, cycleName, data, countryIso, tableName })
  })
}

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

// export const useIsOdpTableDataFetched = (): boolean => {
//   const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
//   const data = useRecordAssessmentData()
//
//   return useMemo<boolean>(() => {
//     return Object.hasOwn(
//       RecordAssessmentDatas.getCountryData({ assessmentName, cycleName, countryIso, data }),
//       TableNames.originalDataPointValue
//     )
//   }, [assessmentName, countryIso, cycleName, data])
// }

export const useIsSectionDataEmpty = (tableSections: Array<TableSection>) => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  const data = useRecordAssessmentData()

  const [sectionDataEmpty, setSectionDataEmpty] = useState(false)
  const sectionTableNames = useMemo(
    () => tableSections.flatMap((ts) => ts.tables.flatMap((t) => t.props.name)),
    [tableSections]
  )

  const dataLoaded = useMemo(
    () => Boolean(data?.[assessmentName]?.[cycleName]?.[countryIso]),
    [assessmentName, countryIso, cycleName, data]
  )

  const allTablesEmpty =
    dataLoaded &&
    sectionTableNames.every((tableName) =>
      RecordAssessmentDatas.isTableDataEmpty({
        assessmentName,
        cycleName,
        data,
        tableName,
        countryIso,
      })
    )

  useEffect(() => {
    if (dataLoaded) {
      setSectionDataEmpty(allTablesEmpty)
    }
  }, [allTablesEmpty, dataLoaded])

  if (!dataLoaded) return false

  return sectionDataEmpty
}

export const useOriginalDataPointYears = (): Array<{ year: string; id: number }> => {
  const odpData = useOriginalDataPointData()

  if (Objects.isEmpty(odpData)) return null

  return Object.entries(odpData).map(([year, data]) => ({
    year,
    id: data.totalLandArea.odpId,
  }))
}
