import { Users } from 'meta/user/users'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'

export const useIsSortable = (): boolean => {
  const user = useUser()
  const cycle = useCycle()

  return Users.isAdministrator(user) || Users.isARegionalFocalPoint(user, cycle) || Users.isAReviewer(user, cycle)
}
