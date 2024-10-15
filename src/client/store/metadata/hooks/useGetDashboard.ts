import { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { MetadataActions } from '../slice'
import { useDashboardItems } from './useDashboardItems'

export const useGetDashboard = () => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const dashboardItems = useDashboardItems()

  useEffect(() => {
    if (!dashboardItems) {
      dispatch(MetadataActions.getDashboard({ assessmentName, cycleName, countryIso }))
    }
  }, [assessmentName, cycleName, countryIso, dispatch, dashboardItems])
}
