import { Express } from 'express'

import { AuthApi } from './auth'

/**
 * API Controller
 * Initialize APIs here
 */

export const Api = {
  init: (express: Express): void => {
    AuthApi.init(express)
  },
}
