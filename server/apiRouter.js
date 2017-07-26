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

const apiRouter = express.Router()
//Nothing should be cached by default with the APIs
apiRouter.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})
apiRouter.use((req, res, next) => {
  const user = R.path(['session', 'passport', 'user'], req)
  if (!user) {
    res.status(401).json({error: 'Not logged in'})
  } else {
    next()
  }
})

userApi.init(apiRouter)
countryApi.init(apiRouter)
odpApi.init(apiRouter)
eofApi.init(apiRouter)
traditionalTableApi.init(apiRouter)
descriptionsApi.init(apiRouter)
reviewApi.init(apiRouter)
assessmentApi.init(apiRouter)

module.exports.router = apiRouter
