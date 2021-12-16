import { Express } from 'express'
import { AuthConfig } from './config'
import { AuthLogin } from './login'

export const AuthApi = {
  init: (express: Express): void => {
    AuthConfig.init(express)

    AuthLogin.init(express)
  },
}
