import * as express from 'express'

import * as eofApi from './eof/api'
import * as odpApi from './odp/api'
import * as userApi from './user/userApi'
import * as traditionalTableApi from './traditionalTable/api'
import * as descriptionsApi from './descriptions/api'
import * as reviewApi from './review/api'
import * as countryApi from './country/api'
import * as assessmentApi from './assessment/api'
import * as growingStockApi from './growingStock/growingStockApi'
import * as auditApi from './audit/api'
import * as sustainableDevelopmentApi from './sustainableDevelopment/sustainableDevelopmentApi'
import * as panEuropeanApi from './panEuropean/panEuropeanApi'
import * as userChatApi from './userChat/userChatApi'
import * as fileRepositoryApi from './fileRepository/fileRepositoryApi'
import * as collaboratorsApi from './collaborators/collaboratorsApi'
import * as countryMessageBoardApi from './countryMessageBoard/countryMessageBoardApi'
import * as versioningApi from './versioning/api'
import * as statisticalFactsheetsApi from './statisticalFactsheets/api'
import * as dataExportApi from './dataExport/api'

const apiRouter = express.Router()
// Nothing should be cached by default with the APIs
apiRouter.use((req: any, res: any, next: any) => {
  res.set('Cache-Control', 'no-store')
  next()
})

userApi.init(apiRouter)
countryApi.init(apiRouter)
odpApi.init(apiRouter)
eofApi.init(apiRouter)
traditionalTableApi.init(apiRouter)
descriptionsApi.init(apiRouter)
reviewApi.init(apiRouter)
assessmentApi.init(apiRouter)
growingStockApi.init(apiRouter)
auditApi.init(apiRouter)
sustainableDevelopmentApi.init(apiRouter)
panEuropeanApi.init(apiRouter)
userChatApi.init(apiRouter)
fileRepositoryApi.init(apiRouter)
collaboratorsApi.init(apiRouter)
countryMessageBoardApi.init(apiRouter)
versioningApi.init(apiRouter)
statisticalFactsheetsApi.init(apiRouter)
dataExportApi.init(apiRouter)

export const router = apiRouter
