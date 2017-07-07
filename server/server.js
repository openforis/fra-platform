require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const migrations = require('./db/migration/execMigrations')
const sessionInit = require('./sessionInit')
const apiRouter = require('./apiRouter')
const authApi = require('./auth/authApi')
const resourceCacheControl = require('./resourceCacheControl')

const app = express()

resourceCacheControl.init(app)

migrations()

sessionInit.init(app)

app.use(compression({threshold: 512}))
app.use('/', express.static(`${__dirname}/../dist`))
app.use('/img/', express.static(`${__dirname}/../web-resources/img`))
app.use('/css/', express.static(`${__dirname}/../web-resources/css`))
app.use('/ckeditor/', express.static(`${__dirname}/../web-resources/ckeditor`))
app.use(bodyParser.json({limit: '5000kb'}))

//Not part of apiRouter because of special urls (starting from root)
authApi.init(app)

app.use('/api', apiRouter.router)

app.listen(process.env.PORT, () => {
  console.log('FRA Platform server listening on port ', process.env.PORT)
})
