require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const migrations = require('./db/migration/execMigrations')
const sessionInit = require('./sessionInit')

const authApi = require('./auth/authApi')
const countryRepository = require('./countryRepository')
const eofApi = require('./eof/api')
const odpApi = require('./odp/api')
const userApi = require('./user/userApi')
const traditionalTableApi = require('./traditionalTable/api')
const descriptionsApi = require('./descriptions/api')
const reviewApi = require('./review/api')

const app = express()
const apiRouter = express.Router()
//Nothing should be cached by default with the APIs
apiRouter.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

migrations()

sessionInit.init(app)
userApi.init(apiRouter)

app.use(compression({threshold: 512}))
app.use('/', express.static(`${__dirname}/../dist`))
app.use('/img/', express.static(`${__dirname}/../web-resources/img`))
app.use('/css/', express.static(`${__dirname}/../web-resources/css`))
app.use('/ckeditor/', express.static(`${__dirname}/../web-resources/ckeditor`))
app.use(bodyParser.json({limit: '5000kb'}))

authApi.init(app)

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

app.use('/api', apiRouter)

app.listen(process.env.PORT, () => {
  console.log('FRA Platform server listening on port ', process.env.PORT)
})
