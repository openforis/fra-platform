import { Express } from 'express'
import { AuthConfig } from './config'
import { AuthLogin } from './login'
import { AuthLogout } from './logout'
import { AuthChangePassword } from './changePassword'
import { AuthResetPassword } from './resetPassword'

export const AuthApi = {
  init: (express: Express): void => {
    AuthConfig.init(express)

    AuthLogin.init(express)
    AuthLogout.init(express)
    AuthChangePassword.init(express)
    AuthResetPassword.init(express)
  },
}
