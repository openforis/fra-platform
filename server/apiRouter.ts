import * as express from 'express'

import * as eofApi from './eof/api'
import * as odpApi from './odp/api'
import * as userApi from './user/userApi'
import * as traditionalTableApi from './traditionalTable/api'
import * as reviewApi from './review/api'
import * as sustainableDevelopmentApi from './sustainableDevelopment/sustainableDevelopmentApi'
import * as panEuropeanApi from './panEuropean/panEuropeanApi'
import * as userChatApi from './userChat/userChatApi'
import * as fileRepositoryApi from './fileRepository/fileRepositoryApi'

const apiRouter = express.Router()
// Nothing should be cached by default with the APIs
apiRouter.use((req: any, res: any, next: any) => {
  res.set('Cache-Control', 'no-store')
  next()
})

// TODO: Verify: deprecated?
panEuropeanApi.init(apiRouter)
sustainableDevelopmentApi.init(apiRouter)

userApi.init(apiRouter)
odpApi.init(apiRouter)
eofApi.init(apiRouter)

traditionalTableApi.init(apiRouter)

reviewApi.init(apiRouter)
userChatApi.init(apiRouter)
fileRepositoryApi.init(apiRouter)

export const router = apiRouter
