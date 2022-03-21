import { useAppSelector } from '@client/store'
import { Table, TableSection } from '@meta/assessment'
import { useCountryIso } from '@client/hooks'
import { TableData } from '@meta/data'

export const useTableSections = (): Array<TableSection> =>
  useAppSelector((state) => state.pages.assessmentSection.tableSections)

export const useTableData = (props: { table: Table }): TableData => {
  const { table } = props
  const countryIso = useCountryIso()
  const { odp } = table.props
  const tableData = useAppSelector((state) => state.pages.assessmentSection.data)
  const odpData = useAppSelector((state) => state.pages.assessmentSection.originalDataPointData)

  if (!tableData) return null
  if (!odp) return tableData

  const currData = tableData[countryIso][table.props.name]

  // Return normal table data if table is not OriginalDataPointTable
  const currOdpData = odpData?.[countryIso].originalDataPointValue

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
  return Object.keys(odpData[countryIso].originalDataPointValue)
}
