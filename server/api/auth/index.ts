import { Express } from 'express'

import { AuthConfig } from '@server/api/auth/authConfig'

import { AuthGetInvitation } from '@server/api/auth/getInvitation'
import { AuthResetPassword } from '@server/api/auth/resetPassword'
import { AuthChangePassword } from '@server/api/auth/changePassword'
import { AuthLogin } from './login'
import { AuthLogout } from './logout'

export const AuthApi = {
  init: (express: Express): void => {
    AuthConfig.init(express)

    AuthLogin.init(express)
    AuthLogout.init(express)

    AuthGetInvitation.init(express)

    AuthChangePassword.init(express)
    AuthResetPassword.init(express)
  },
}
