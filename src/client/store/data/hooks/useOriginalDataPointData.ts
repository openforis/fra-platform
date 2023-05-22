import { TableNames } from '@meta/assessment'
import { RecordCountryData } from '@meta/data'

import { useAppSelector } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'

export const useOriginalDataPointData = (): RecordCountryData | undefined => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  return useAppSelector(
    (state) =>
      state.data.tableData?.[assessment.props.name]?.[cycle.name]?.[countryIso]?.[TableNames.originalDataPointValue]
  )
}
