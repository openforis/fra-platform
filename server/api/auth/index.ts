import { Express } from 'express'
import { AuthConfig } from './config'
import { AuthLogin } from './login'
import { AuthLogout } from './logout'

export const AuthApi = {
  init: (express: Express): void => {
    AuthConfig.init(express)

    AuthLogin.init(express)
    AuthLogout.init(express)
  },
}
