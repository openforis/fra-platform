import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { Routes } from 'meta/routes/routes'

import { useLastPublishedCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCycleRouteParams } from 'client/hooks/routeParams'

export const useCycleRedirect = (): void => {
  const navigate = useNavigate()
  const user = useUser()
  const lastPublishedCycle = useLastPublishedCycle()
  const { assessmentName, cycleName } = useCycleRouteParams()

  useEffect(() => {
    // When user is not logged in, redirect to last published cycle (e.g. when accessing older cycles)
    // Disable this if you want to allow non-logged users to access older cycles
    const shouldRedirectToLastPublished = !user && cycleName !== lastPublishedCycle?.name

    if (shouldRedirectToLastPublished && lastPublishedCycle) {
      const redirectPath = Routes.Cycle.generatePath({ assessmentName, cycleName: lastPublishedCycle.name })
      navigate(redirectPath, { replace: true })
    }
  }, [assessmentName, cycleName, lastPublishedCycle, navigate, user])
}
