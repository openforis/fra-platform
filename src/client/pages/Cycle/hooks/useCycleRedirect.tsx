import { useEffect } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'

import { Routes } from 'meta/routes'

import { useLastPublishedCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCycleRouteParams } from 'client/hooks/routeParams'

export const useCycleRedirect = (): void => {
  const navigate = useNavigate()
  const user = useUser()
  const lastPublishedCycle = useLastPublishedCycle()
  const { assessmentName, cycleName } = useCycleRouteParams()

  // Only match the exact cycle home route, not nested routes
  const isExactCycleHome = useMatch(Routes.Cycle.path.absolute)

  useEffect(() => {
    if (!isExactCycleHome) {
      return
    }

    // When user is not logged in, redirect to last published cycle (e.g. when accessing older cycles)
    // Disable this if you want to allow non-logged users to access older cycles
    const shouldRedirectToLastPublished = !user && cycleName !== lastPublishedCycle?.name

    if (shouldRedirectToLastPublished && lastPublishedCycle) {
      const redirectPath = Routes.Cycle.generatePath({ assessmentName, cycleName: lastPublishedCycle.name })
      navigate(redirectPath, { replace: true })
    }
  }, [assessmentName, cycleName, isExactCycleHome, lastPublishedCycle, navigate, user])
}
