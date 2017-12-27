const express = require('express')
const R = require('ramda')

const eofApi = require('./eof/api')
const odpApi = require('./odp/api')
const userApi = require('./user/userApi')
const traditionalTableApi = require('./traditionalTable/api')
const descriptionsApi = require('./descriptions/api')
const reviewApi = require('./review/api')
const countryApi = require('./country/api')
const assessmentApi = require('./assessment/api')
const growingStockApi = require('./growingStock/growingStockApi')
const biomassStockApi = require('./biomassStock/biomassStockApi')
const auditApi = require('./audit/api')
const sustainableDevelopmentApi = require('./sustainableDevelopment/sustainableDevelopmentApi')

const apiRouter = express.Router()
//Nothing should be cached by default with the APIs
apiRouter.use((req, res, next) => {
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
biomassStockApi.init(apiRouter)
auditApi.init(apiRouter)
sustainableDevelopmentApi.init(apiRouter)

module.exports.router = apiRouter
