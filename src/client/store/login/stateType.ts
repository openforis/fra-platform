import { Assessment } from 'meta/assessment'
import { AuthProvider, RoleName, User, UserRole } from 'meta/user'

export interface InvitationState {
  assessment?: Assessment
  invitedUser?: User
  userProviders?: Array<AuthProvider>
  userRole?: UserRole<RoleName>
}

export interface LoginState {
  login: {
    status?: string
    type?: string
    email?: string
    password?: string
  }
  invitation: InvitationState
  resetPassword?: {
    error?: string
    message?: string
  }
  changePassword?: {
    error?: string
    message?: string
  }
}
