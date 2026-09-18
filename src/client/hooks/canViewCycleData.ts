import { useMemo } from 'react'

import { Cycles } from 'meta/assessment/cycles'
import { Users } from 'meta/user/users'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'

// Returns true if cycle is published or user is admin
export const useCanViewCycleData = (): boolean => {
  const cycle = useCycle()
  const user = useUser()
  const isAdmin = Users.isAdministrator(user)

  return useMemo(() => isAdmin || Cycles.isPublished(cycle), [cycle, isAdmin])
}
