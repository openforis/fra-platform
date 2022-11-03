import { useEffect, useMemo, useState } from 'react'

import { NodeValue, Table, TableSection } from '@meta/assessment'
import { NodeUpdate, TableData, TableDatas } from '@meta/data'

import { useAppSelector } from '@client/store'
import { useAssessmentCountry } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'

export const useShowOriginalDatapoints = () =>
  useAppSelector((state) => state.pages.assessmentSection.showOriginalDataPoint)

export const useTableSections = (props: { sectionName: string }): Array<TableSection> =>
  useAppSelector((state) => state.pages.assessmentSection.tableSections[props.sectionName] ?? [])

const useOriginalDataPointData = (): Record<string, Record<string, NodeValue>> | undefined => {
  const countryIso = useCountryIso()
  return useAppSelector((state) => state.pages.assessmentSection.data?.[countryIso]?.originalDataPointValue)
}

export const useHasOriginalDataPointData = (): boolean => Object.keys(useOriginalDataPointData() ?? {}).length > 0

export const useTableData = (props: { table: Table }): TableData => {
  const { table } = props
  const countryIso = useCountryIso()
  const { odp } = table.props
  const country = useAssessmentCountry()
  const tableData = useAppSelector((state) => state.pages.assessmentSection.data)
  const odpData = useOriginalDataPointData() ?? {}
  const showOriginalDatapoints = useShowOriginalDatapoints()

  if (!tableData?.[countryIso]) return {} as TableData
  if (!odp || !showOriginalDatapoints || !country.props.forestCharacteristics.useOriginalDataPoint) return tableData

  const currData = tableData[countryIso][table.props.name]

  const tableDataWithODP = {
    [countryIso]: {
      [table.props.name]: { ...currData, ...odpData },
    },
  }

  return tableDataWithODP as TableData
}

export const useIsSectionDataEmpty = (tableSections: TableSection[]) => {
  const countryIso = useCountryIso()
  const { data } = useAppSelector((state) => state.pages.assessmentSection)

  const [sectionDataEmpty, setSectionDataEmpty] = useState(false)
  const sectionTableNames = useMemo(
    () => tableSections.flatMap((ts) => ts.tables.flatMap((t) => t.props.name)),
    [tableSections]
  )

  const dataLoaded = useMemo(() => Boolean(data?.[countryIso]), [countryIso, data])

  const allTablesEmpty =
    dataLoaded &&
    sectionTableNames.every((tableName) =>
      TableDatas.isTableDataEmpty({
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

export const useOriginalDataPointYears = () => {
  const odpData = useOriginalDataPointData()
  if (!odpData) return null
  return Object.keys(odpData)
}

export const useNodeValueValidation = (props: { tableName: string }): NodeUpdate | undefined =>
  useAppSelector((state) => state.pages.assessmentSection.nodeValueValidation[props.tableName])
