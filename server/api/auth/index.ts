import { ApiEndPoint } from '@meta/api/endpoint'
import { Express } from 'express'

import { AuthConfig } from './config'
import { getGoogleCallback, getGoogleLogin, postLocalLogin } from './login'
import { postChangePassword } from './postChangePassword'
import { postLogout } from './postLogout'
import { postResetPassword } from './postResetPassword'

export const AuthApi = {
  init: (express: Express): void => {
    // Initialize auth config
    AuthConfig.init(express)

    express.post(ApiEndPoint.Auth.login(), postLocalLogin)
    express.get(ApiEndPoint.Auth.google(), getGoogleLogin)
    express.get(ApiEndPoint.Auth.googleCallback(), getGoogleCallback)

    express.post(ApiEndPoint.Auth.logout(), postLogout)

    express.post(ApiEndPoint.Auth.changePassword(), postChangePassword)
    express.post(ApiEndPoint.Auth.resetPassword(), postResetPassword)
  },
}
