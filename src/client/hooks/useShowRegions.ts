import { useMemo } from 'react'

import { Cycles } from 'meta/assessment/cycle'
import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useIsGeoRoute } from 'client/hooks/useIsRoute'

export const useShowRegions = () => {
  const cycle = useCycle()
  const user = useUser()
  const geoRoute = useIsGeoRoute()
  const isAdmin = Users.isAdministrator(user)

  return useMemo(() => {
    return !geoRoute && (isAdmin || Cycles.isPublished(cycle))
  }, [cycle, geoRoute, isAdmin])
}
