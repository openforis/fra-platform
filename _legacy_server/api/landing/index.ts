import { Express } from 'express'

import { LandingGet } from './get'

export const LandingApi = {
  init: (express: Express): void => {
    LandingGet.init(express)
  },
}
