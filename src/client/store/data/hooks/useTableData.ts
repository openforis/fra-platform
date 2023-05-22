import { Table, TableNames } from '@meta/assessment'
import { RecordCountryData } from '@meta/data'

import { useAppSelector } from '@client/store'
import { useAssessment, useAssessmentCountry, useCycle } from '@client/store/assessment'
import { useShowOriginalDatapoints } from '@client/store/ui/assessmentSection/hooks'
import { useCountryIso } from '@client/hooks'

import { useOriginalDataPointData } from './useOriginalDataPointData'

export const useTableData = (props: { table: Table }): RecordCountryData => {
  const { table } = props
  const countryIso = useCountryIso()
  const { odp } = table.props
  const assessment = useAssessment()
  const cycle = useCycle()
  const country = useAssessmentCountry()

  const tableData = useAppSelector((state) => state.data.tableData[assessment.props.name][cycle.name])
  const odpData = useOriginalDataPointData() ?? {}
  const showOriginalDatapoints = useShowOriginalDatapoints()

  if (!tableData?.[countryIso]) return {}

  const shouldReturnWithoutODP =
    !odp ||
    !showOriginalDatapoints ||
    (table.props.name === TableNames.forestCharacteristics && !country.props.forestCharacteristics.useOriginalDataPoint)

  if (shouldReturnWithoutODP) return tableData

  const currData = tableData[countryIso][table.props.name]

  const tableDataWithODP = {
    [countryIso]: {
      [table.props.name]: { ...currData, ...odpData },
    },
  }

  return tableDataWithODP
}
