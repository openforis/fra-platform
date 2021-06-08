import { Express } from 'express'

import { AuthConfig } from './authConfig'

import { AuthGetInvitation } from './getInvitation'
import { AuthResetPassword } from './resetPassword'
import { AuthChangePassword } from './changePassword'
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
