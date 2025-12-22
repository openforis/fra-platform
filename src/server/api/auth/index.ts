import { Express } from 'express'
import multer from 'multer'

import { ApiEndPoint } from 'meta/api/endpoint'

import { loginGoogle, loginGoogleCallback } from 'server/api/auth/loginGoogle'
import { loginLocal } from 'server/api/auth/loginLocal'
import { logout } from 'server/api/auth/logout'
import { resetPassword } from 'server/api/auth/resetPassword'

import { AuthConfig } from './config'

export const AuthApi = {
  init: (express: Express): void => {
    // Initialize auth config
    AuthConfig.init(express)

    // login
    express.post(ApiEndPoint.Auth.login(), multer().none(), loginLocal)
    express.get(ApiEndPoint.Auth.google(), loginGoogle)
    express.get(ApiEndPoint.Auth.googleCallback(), loginGoogleCallback)
    // logout
    express.post(ApiEndPoint.Auth.logout(), logout)
    // reset password
    express.post(ApiEndPoint.Auth.resetPassword(), multer().none(), resetPassword)
  },
}
