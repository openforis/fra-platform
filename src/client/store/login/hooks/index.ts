import { useAppSelector } from '@client/store'
import { Assessment } from '@meta/assessment'
import { RoleName, User, UserRole } from '@meta/user'

export const useInvitation = ():
  | {
      userRole?: UserRole<RoleName>
      assessment?: Assessment
      invitedUser?: User
    }
  | undefined => useAppSelector((state) => state.login?.invitation)
