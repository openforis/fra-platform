import { Express } from 'express'
import { ApiEndPoint } from '@common/api/endpoint'
import { AuthConfig } from './config'
import { getGoogleCallback, getGoogleLogin, postLocalLogin } from './login'
import { postLogout } from './postLogout'
import { postResetPassword } from './postResetPassword'
import { postChangePassword } from './postChangePassword'

export const AuthApi = {
  init: (express: Express): void => {
    // Initialize auth config
    AuthConfig.init(express)

    express.post(ApiEndPoint.Auth.Login.local(), postLocalLogin)
    express.get(ApiEndPoint.Auth.Login.google(), getGoogleLogin)
    express.get(ApiEndPoint.Auth.Login.googleCallback(), getGoogleCallback)

    express.post(ApiEndPoint.Auth.logout(), postLogout)

    express.post(ApiEndPoint.Auth.changePassword(), postChangePassword)
    express.post(ApiEndPoint.Auth.ResetPassword.one(), postResetPassword)
  },
}
