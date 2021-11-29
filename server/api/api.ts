import { Express } from 'express'
import { InitApi } from '@server/api/init'

/**
 * API Controller
 * Initialize APIs here
 */

export const Api = {
  init: (express: Express): void => {
    InitApi.init(express)
  },
}
