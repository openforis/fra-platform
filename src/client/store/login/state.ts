import { Assessment } from 'meta/assessment/assessment'
import { AuthProvider } from 'meta/user/auth'
import { UserInvitation } from 'meta/user/invitation'
import { User } from 'meta/user/user'

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
  userInvitation?: UserInvitation
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
}

export const initialState: LoginState = {
  login: {},
  invitation: {},
}
