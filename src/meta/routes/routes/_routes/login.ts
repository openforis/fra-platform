import { LoginInvitationQueryParams } from 'meta/routes/queryParams/invitation'
import { LoginQueryParams } from 'meta/routes/queryParams/login'
import { ChangePasswordRouteParams } from 'meta/routes/routeParams/changePassword'
import { CycleRouteParams } from 'meta/routes/routeParams/cycle'
import { InvitationRouteParams } from 'meta/routes/routeParams/invitation'
import { Cycle } from 'meta/routes/routes/_routes/cycle'
import { createRoute } from 'meta/routes/routes/createRoute'

export const Login = createRoute<CycleRouteParams, LoginQueryParams>({ path: 'login', parent: Cycle })
export const LoginInvitation = createRoute<InvitationRouteParams>({
  path: 'invitation/:invitationUuid',
  parent: Login,
})
export const LoginInvitationLocal = createRoute<CycleRouteParams, LoginInvitationQueryParams>({
  path: 'local',
  parent: LoginInvitation,
})
export const LoginInvitationAccept = createRoute<InvitationRouteParams>({
  path: 'accept',
  parent: LoginInvitation,
})

export const LoginResetPassword = createRoute<CycleRouteParams>({
  path: 'reset-password',
  parent: Login,
})

export const LoginChangePassword = createRoute<ChangePasswordRouteParams>({
  path: ':resetPasswordUuid',
  parent: LoginResetPassword,
})
