import { LoginInvitationQueryParams } from 'meta/routes/queryParams/invitation'
import { LoginQueryParams } from 'meta/routes/queryParams/login'
import { LoginResetPasswordQueryParams } from 'meta/routes/queryParams/resetPassword'
import { CycleRouteParams } from 'meta/routes/routeParams/cycle'
import { Cycle } from 'meta/routes/routes/_routes/cycle'
import { createRoute } from 'meta/routes/routes/createRoute'

export const Login = createRoute<CycleRouteParams, LoginQueryParams>({ path: 'login', parent: Cycle })
export const LoginInvitation = createRoute<CycleRouteParams, LoginInvitationQueryParams>({
  path: 'invitation',
  parent: Login,
})
export const LoginInvitationLocal = createRoute<CycleRouteParams, LoginInvitationQueryParams>({
  path: 'local',
  parent: LoginInvitation,
})
export const LoginResetPassword = createRoute<CycleRouteParams, LoginResetPasswordQueryParams>({
  path: 'resetPassword',
  parent: Login,
})
