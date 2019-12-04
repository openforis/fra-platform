module.exports = () => {
  const path = require('path')
  const express = require('express')
  const bodyParser = require('body-parser')
  const compression = require('compression')
  const fileUpload = require('express-fileupload')

  const sessionInit = require('./sessionInit')
  const apiRouter = require('./apiRouter')
  const authApi = require('./auth/authApi')
  const resourceCacheControl = require('./resourceCacheControl')
  const definitionsApi = require('./definitions/api')
  const accessControl = require('./auth/accessControl')
  const loginHandler = require('./auth/loginHandler')
  const {sendErr} = require('./utils/requestUtils')

  const app = express()

  app.use(bodyParser.json({limit: '5000kb'}))

  resourceCacheControl.init(app)
//Not part of apiRouter because of special urls (starting from root)
  sessionInit.init(app)
  authApi.init(app)
  accessControl.init(app)

  app.use(compression({threshold: 512}))
  app.use('/style', express.static(`${__dirname}/../dist/style`))
  app.use('/js', express.static(`${__dirname}/../dist/js`))
  loginHandler.init(app)

  app.use('/img/', express.static(`${__dirname}/../web-resources/img`))
  app.use('/css/', express.static(`${__dirname}/../web-resources/css`))
  app.use('/ckeditor', express.static(`${__dirname}/../web-resources/ckeditor`), )

  app.use(fileUpload())
  app.use('/api', apiRouter.router)
  // app.use('/', express.static(`${__dirname}/../dist`))
  app.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '../dist/')});
  });
  definitionsApi.init(app)

// Custom error-handling for handling custom exceptions and
// sending the uncaught errors as json instead of HTML
// http://expressjs.com/en/guide/error-handling.html
  app.use((err, req, res, next) => {
    if (err) sendErr(res, err)
  })

  app.listen(process.env.PORT, () => {
    console.log('FRA Platform server listening on port ', process.env.PORT, ' with pid: ', process.pid)
  })

}
