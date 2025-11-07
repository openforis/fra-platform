import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { OriginalDataPointActions } from 'client/store/data/originalDataPoint/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Props = {
  originalDataPoint: OriginalDataPoint
  index: number
}

type Returned = () => void

export const useDeleteNationalClass = (props: Props): Returned => {
  const { index, originalDataPoint } = props
  const dispatch = useAppDispatch()

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useCallback(() => {
    const props = { assessmentName, cycleName, countryIso, originalDataPoint, index }
    dispatch(OriginalDataPointActions.deleteOriginalDataPointNationalClass(props))
  }, [assessmentName, countryIso, cycleName, dispatch, index, originalDataPoint])
}
