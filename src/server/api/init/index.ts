import { Express } from 'express'
import * as passport from 'passport'

import { ApiEndPoint } from '@meta/api/endpoint'

import { init } from '@server/api/init/init'

export const InitApi = {
  init: (express: Express): void => {
    express.get(ApiEndPoint.init(), passport.authenticate('jwt', { session: false }), init)
  },
}
