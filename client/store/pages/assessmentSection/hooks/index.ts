import { Table, TableSection } from '@meta/assessment'
import { NodeUpdate, TableData } from '@meta/data'

import { useAppSelector } from '@client/store'
import { useAssessmentCountry } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'

export const useShowOriginalDatapoints = () =>
  useAppSelector((state) => state.pages.assessmentSection.showOriginalDataPoint)

export const useTableSections = (props: { sectionName: string }): Array<TableSection> =>
  useAppSelector((state) => state.pages.assessmentSection.tableSections[props.sectionName] ?? [])

export const useTableData = (props: { table: Table }): TableData => {
  const { table } = props
  const countryIso = useCountryIso()
  const { odp } = table.props
  const country = useAssessmentCountry()
  const tableData = useAppSelector((state) => state.pages.assessmentSection.data)
  const odpData = useAppSelector((state) => state.pages.assessmentSection.originalDataPointData)
  const showOriginalDatapoints = useShowOriginalDatapoints()

  if (!tableData) return {} as TableData
  if (!odp || !showOriginalDatapoints || !country.props.forestCharacteristics.useOriginalDataPoint) return tableData

  const currData = tableData[countryIso][table.props.name]

  // Return normal table data if table is not OriginalDataPointTable
  const currOdpData = odpData?.[countryIso]?.originalDataPointValue ?? {}

  const tableDataWithODP = <TableData>{
    [countryIso]: {
      [table.props.name]: { ...currData, ...currOdpData },
    },
  }

  return tableDataWithODP
}

export const useOriginalDataPointYears = () => {
  const countryIso = useCountryIso()
  const odpData = useAppSelector((state) => state.pages.assessmentSection.originalDataPointData)
  if (!odpData) return null
  return Object.keys(odpData[countryIso]?.originalDataPointValue ?? {})
}

export const useNodeValueValidation = (props: { tableName: string }): NodeUpdate | undefined =>
  useAppSelector((state) => state.pages.assessmentSection.nodeValueValidation[props.tableName])
