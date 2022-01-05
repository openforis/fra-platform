import { Assessment } from '@meta/assessment'
import { RoleName, User, UserRole } from '@meta/user'

export interface LoginState {
  login: {
    status?: string
    user: {
      type: string
      email: string
      password: string
    }
  }
  invitation: {
    userRole?: UserRole<RoleName>
    assessment?: Assessment
    user?: User
  }
}
