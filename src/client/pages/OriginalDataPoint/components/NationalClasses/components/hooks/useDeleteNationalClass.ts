import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { OriginalDataPoint } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { OriginalDataPointActions } from 'client/store/ui/originalDataPoint'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  originalDataPoint: OriginalDataPoint
  index: number
}

export const useDeleteNationalClass = (props: Props) => {
  const { originalDataPoint, index } = props
  const dispatch = useAppDispatch()

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback(() => {
    const props = { assessmentName, cycleName, countryIso, originalDataPoint, index }
    dispatch(OriginalDataPointActions.deleteOriginalDataPointNationalClass(props))
  }, [countryIso, cycleName, assessmentName, originalDataPoint, index, dispatch])
}
