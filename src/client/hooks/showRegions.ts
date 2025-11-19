import { useMemo } from 'react'

import { Cycles } from 'meta/assessment/cycles'
import { Users } from 'meta/user/users'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useIsGeoRoute } from 'client/hooks/routes'

export const useShowRegions = (): boolean => {
  const cycle = useCycle()
  const user = useUser()
  const geoRoute = useIsGeoRoute()
  const isAdmin = Users.isAdministrator(user)

  return useMemo(() => {
    return !geoRoute && (isAdmin || !user || Cycles.isPublished(cycle))
  }, [cycle, geoRoute, isAdmin, user])
}
