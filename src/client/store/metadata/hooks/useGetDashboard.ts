import { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { MetadataActions } from '../slice'

export const useGetDashboard = () => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  useEffect(() => {
    dispatch(MetadataActions.getDashboard({ assessmentName, cycleName, countryIso }))
  }, [assessmentName, cycleName, countryIso, dispatch])
}
