import { Assessment } from 'meta/assessment'
import { AuthProvider, RoleName, User, UserRole } from 'meta/user'

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
    userProviders?: Array<AuthProvider>
  }
  resetPassword?: {
    error?: string
    message?: string
  }
  changePassword?: {
    error?: string
    message?: string
  }
}
