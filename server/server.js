require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const migrations = require('./db/migration/execMigrations')
const sessionInit = require('./sessionInit')
const apiRouter = require('./apiRouter')
const authApi = require('./auth/authApi')
const authMiddleware = require('./auth/authMiddleware')
const definitionsApi = require('./definitions/api')
const resourceCacheControl = require('./resourceCacheControl')
const { sendErr } = require('./utils/requestUtils')

const app = express()

migrations()

resourceCacheControl.init(app)
sessionInit.init(app)
authMiddleware.init(app)

app.use(compression({threshold: 512}))
app.use('/', express.static(`${__dirname}/../dist`))
app.use('/img/', express.static(`${__dirname}/../web-resources/img`))
app.use('/css/', express.static(`${__dirname}/../web-resources/css`))
app.use('/ckeditor/', express.static(`${__dirname}/../web-resources/ckeditor`))
app.use(bodyParser.json({limit: '5000kb'}))

//Not part of apiRouter because of special urls (starting from root)
authApi.init(app)

app.use('/api', apiRouter.router)

definitionsApi.init(app)

// Custom error-handling for handling custom exceptions and
// sending the uncaught errors as json instead of HTML
// http://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
  if (err) sendErr(res, err)
})

app.listen(process.env.PORT, () => {
  console.log('FRA Platform server listening on port ', process.env.PORT)
})
