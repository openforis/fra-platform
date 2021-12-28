import { Assessment } from '@meta/assessment'
import { RoleName, User, UserRole } from '@meta/user'

export interface LoginState {
  invitation: {
    userRole?: UserRole<RoleName>
    assessment?: Assessment
    user?: User
  }
}
