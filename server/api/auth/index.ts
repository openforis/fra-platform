import { Express } from 'express'
import { AuthAuthorize } from '@server/api/auth/authorize'
import { AuthConfig } from './config'
import { AuthLogin } from './login'
import { AuthLogout } from './logout'

export const AuthApi = {
  init: (express: Express): void => {
    AuthConfig.init(express)

    AuthLogin.init(express)
    AuthLogout.init(express)
    AuthAuthorize.init(express)
  },
}
