import { NodeValue, TableNames } from '@meta/assessment'

import { useAppSelector } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'

export const useOriginalDataPointData = (): Record<string, Record<string, NodeValue>> | undefined => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  return useAppSelector(
    (state) => state.data[assessment.props.name][cycle.name].tableData[countryIso]?.[TableNames.originalDataPointValue]
  )
}
