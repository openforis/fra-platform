import { Express } from 'express'
import { InitApi } from '@server/api/init'
import { AuthApi } from '@server/api/auth'
import { UserApi } from '@server/api/user'

/**
 * API Controller
 * Initialize APIs here
 */

export const Api = {
  init: (express: Express): void => {
    InitApi.init(express)
    AuthApi.init(express)
    UserApi.init(express)
  },
}
