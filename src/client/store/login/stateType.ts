import { Assessment } from 'meta/assessment'
import { AuthProvider, RoleName, User, UserRole } from 'meta/user'

export type AcceptInvitationFormFields = {
  email?: string
  password?: string
  password2?: string
}

export type AcceptInvitationErrors = Partial<Record<keyof AcceptInvitationFormFields, string | null>>

export type AcceptInvitationFormState = AcceptInvitationFormFields & {
  errors?: AcceptInvitationErrors
}

export interface InvitationState {
  assessment?: Assessment
  invitedUser?: User
  userProviders?: Array<AuthProvider>
  userRole?: UserRole<RoleName>
  acceptForm?: AcceptInvitationFormState
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
