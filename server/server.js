const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const migrations = require('./db/migration/execMigrations')

require('dotenv').config()

const countryRepository = require('./countryRepository')
const eofApi = require('./eof/api')
const userApi = require('./user/userApi')

const app = express()

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

eofApi.init(app)
userApi.init(app)

migrations()

app.listen(process.env.PORT, () => {
  console.log('FRA Platform server listening on port ', process.env.PORT)
})
