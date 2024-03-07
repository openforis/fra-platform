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

export interface LoginInformationState {
  email?: string
  isLoading?: boolean
  password?: string
  status?: string
  type?: string
}

export interface LoginState {
  login: LoginInformationState
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
