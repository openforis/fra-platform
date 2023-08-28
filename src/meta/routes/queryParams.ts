import { Lang } from 'meta/lang'

export type LoginQueryParams = {
  loginError?: string
}

export type LoginInvitationQueryParams = {
  invitationUuid: string
  lang?: Lang
}

export type LoginResetPasswordQueryParams = {
  resetPasswordUuid?: string
}
