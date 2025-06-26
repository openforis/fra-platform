import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { OriginalDataPointActions } from 'client/store/data/originalDataPoint/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  originalDataPoint: OriginalDataPoint
  index: number
}

export const useDeleteNationalClass = (props: Props) => {
  const { index, originalDataPoint } = props
  const dispatch = useAppDispatch()

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useCallback(() => {
    const props = { assessmentName, cycleName, countryIso, originalDataPoint, index }
    dispatch(OriginalDataPointActions.deleteOriginalDataPointNationalClass(props))
  }, [assessmentName, countryIso, cycleName, dispatch, index, originalDataPoint])
}
