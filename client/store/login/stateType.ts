import { Assessment } from '@meta/assessment'
import { RoleName, User, UserRole } from '@meta/user'

export interface LoginState {
  login: {
    status?: string
    type?: string
    email?: string
    password?: string
  }
  invitation: {
    assessment?: Assessment
    invitedUser?: User
    userRole?: UserRole<RoleName>
  }
}
