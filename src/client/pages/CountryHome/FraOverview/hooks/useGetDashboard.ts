import { useEffect } from 'react'

import { useAppDispatch } from 'client/store/hooks'
import { MetaActions } from 'client/store/meta/actions'
import { useDashboardItems } from 'client/store/meta/hooks/dashboard'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useGetDashboard = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso: areaCode, cycleName } = useCountryRouteParams()
  const dashboardItems = useDashboardItems()

  useEffect(() => {
    if (!dashboardItems) {
      dispatch(MetaActions.getDashboard({ assessmentName, cycleName, areaCode }))
    }
  }, [areaCode, assessmentName, cycleName, dashboardItems, dispatch])
}
