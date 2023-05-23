import { Table, TableNames } from '@meta/assessment'
import { RecordAssessmentData } from '@meta/data'

import { useAppSelector } from '@client/store'
import { useAssessment, useAssessmentCountry, useCycle } from '@client/store/assessment'
import { useShowOriginalDatapoints } from '@client/store/ui/assessmentSection/hooks'
import { useCountryIso } from '@client/hooks'

import { useOriginalDataPointData } from './useOriginalDataPointData'

export const useTableData = (props: { table: Table }): RecordAssessmentData => {
  const { table } = props
  const countryIso = useCountryIso()
  const { odp } = table.props
  const assessment = useAssessment()
  const cycle = useCycle()
  const country = useAssessmentCountry()

  const tableData = useAppSelector((state) => state.data.tableData)
  const odpData = useOriginalDataPointData() ?? {}
  const showOriginalDatapoints = useShowOriginalDatapoints()

  if (!tableData?.[assessment.props.name]?.[cycle.name]?.[countryIso]) return {}

  const shouldReturnWithoutODP =
    !odp ||
    !showOriginalDatapoints ||
    (table.props.name === TableNames.forestCharacteristics && !country.props.forestCharacteristics.useOriginalDataPoint)

  if (shouldReturnWithoutODP) return tableData

  const tableDataWithODP = {
    [assessment.props.name]: {
      ...(tableData[assessment.props.name] || {}),
      [cycle.name]: {
        ...(tableData[assessment.props.name][cycle.name] || {}),
        [countryIso]: {
          ...(tableData[assessment.props.name][cycle.name][countryIso] || {}),
          [table.props.name]: {
            ...(tableData[assessment.props.name][cycle.name][countryIso][table.props.name] || {}),
            ...odpData,
          },
        },
      },
    },
  }

  return tableDataWithODP
}
