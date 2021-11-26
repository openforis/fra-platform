import { Express } from 'express'
import { InitGet } from '@server/api/init/init'

export const InitApi = {
  init: (express: Express): void => {
    InitGet.init(express)
  },
}
