const express = require('express')

const countryRepository = require('./countryRepository')
const eofApi = require('./eof/api')
const odpApi = require('./odp/api')
const userApi = require('./user/userApi')
const traditionalTableApi = require('./traditionalTable/api')
const descriptionsApi = require('./descriptions/api')
const reviewApi = require('./review/api')

const apiRouter = express.Router()
//Nothing should be cached by default with the APIs
apiRouter.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

userApi.init(apiRouter)

apiRouter.get('/country/all', (req, res) => {
  countryRepository.getAllCountries().then(result => {
    res.json(result.rows)
  }).catch(err => {
    console.error(err)
    res.status(500).json({error: 'Could not retrieve country data'})
  })
})

odpApi.init(apiRouter)
eofApi.init(apiRouter)
traditionalTableApi.init(apiRouter)
descriptionsApi.init(apiRouter)
reviewApi.init(apiRouter)

module.exports.router = apiRouter
