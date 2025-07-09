import { User } from 'meta/user'

import { useUser } from 'client/store/user/hooks/user'

export const useTargetUser = (): User => {
  return useUser()
}
