import { Assessment } from 'meta/assessment'
import { AuthProvider, RoleName, User, UserRole } from 'meta/user'

import { useAppSelector } from 'client/store'

export const useInvitation = ():
  | {
      userRole?: UserRole<RoleName>
      assessment?: Assessment
      invitedUser?: User
      userProviders?: Array<AuthProvider>
    }
  | undefined => useAppSelector((state) => state.login?.invitation)
