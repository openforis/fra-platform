require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const migrations = require('./db/migration/execMigrations')
const sessionInit = require('./sessionInit')

const countryRepository = require('./countryRepository')
const eofApi = require('./eof/api')
const odpApi = require('./odp/api')
const userApi = require('./user/userApi')
const descriptionsApi = require('./descriptions/api')

const app = express()

migrations()

sessionInit.init(app)
userApi.init(app)

app.use(compression({threshold: 512}))
app.use('/', express.static(`${__dirname}/../dist`))
app.use('/img/', express.static(`${__dirname}/../web-resources/img`))
app.use(bodyParser.json({limit: '5000kb'}))

app.get('/api/country/all', (req, res) => {
  countryRepository.getAllCountries().then(result => {
    res.json(result.rows)
  }).catch(err => {
    console.error(err)
    res.status(500).json({error: 'Could not retrieve country data'})
  })
})

odpApi.init(app)
eofApi.init(app)
descriptionsApi.init(app)

app.listen(process.env.PORT, () => {
  console.log('FRA Platform server listening on port ', process.env.PORT)
})
