require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const migrations = require('./db/migration/execMigrations')
const sessionInit = require('./sessionInit')
const apiRouter = require('./apiRouter')
const authApi = require('./auth/authApi')
const authMiddleware = require('./auth/authMiddleware')
const resourceCacheControl = require('./resourceCacheControl')
const accessControl = require('./auth/accessControl')
const { sendErr } = require('./utils/requestUtils')

const app = express()

migrations()

resourceCacheControl.init(app)
//Not part of apiRouter because of special urls (starting from root)
sessionInit.init(app)
authApi.init(app)
accessControl.init(app)
authMiddleware.init(app)

app.use(compression({threshold: 512}))
app.use('/', express.static(`${__dirname}/../dist`))
app.use('/login.html', express.static(`${__dirname}/../web-resources/login.html`))
app.use('/img/', express.static(`${__dirname}/../web-resources/img`))
app.use('/css/', express.static(`${__dirname}/../web-resources/css`))
app.use('/ckeditor/', express.static(`${__dirname}/../web-resources/ckeditor`))
app.use(bodyParser.json({limit: '5000kb'}))

app.use('/api', apiRouter.router)

// Custom error-handling for handling custom exceptions and
// sending the uncaught errors as json instead of HTML
// http://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
  if (err) sendErr(res, err)
})

app.listen(process.env.PORT, () => {
  console.log('FRA Platform server listening on port ', process.env.PORT)
})
