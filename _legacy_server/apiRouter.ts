import * as express from 'express'

import * as eofApi from './eof/api'
import * as userApi from './user/userApi'
import * as sustainableDevelopmentApi from './sustainableDevelopment/sustainableDevelopmentApi'
import * as panEuropeanApi from './panEuropean/panEuropeanApi'

const apiRouter = express.Router()
// Nothing should be cached by default with the APIs

// TODO: Verify: deprecated?
panEuropeanApi.init(apiRouter)
sustainableDevelopmentApi.init(apiRouter)

// TODO: Verify how much refactoring needeed before moving under server/api/
userApi.init(apiRouter)
eofApi.init(apiRouter)

export const router = apiRouter
