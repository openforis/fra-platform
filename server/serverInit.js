module.exports = () => {
  const path = require('path')
  const express = require('express')
  const bodyParser = require('body-parser')
  const compression = require('compression')
  const fileUpload = require('express-fileupload')

  const countryRepository = require('./country/countryRepository')

  const sessionInit = require('./sessionInit')
  const apiRouter = require('./apiRouter')
  const authApi = require('./auth/authApi')
  const resourceCacheControl = require('./resourceCacheControl')
  const definitionsApi = require('./definitions/api')
  const { sendErr, appUri } = require('./utils/requestUtils')

  const app = express()

  app.use(bodyParser.json({ limit: '5000kb' }))

  resourceCacheControl.init(app)
//Not part of apiRouter because of special urls (starting from root)
  sessionInit.init(app)
  authApi.init(app)

  app.use(compression({ threshold: 512 }))

  app.use('/img/', express.static(`${__dirname}/../web-resources/img`))
  app.use('/css/', express.static(`${__dirname}/../web-resources/css`))
  app.use('/ckeditor', express.static(`${__dirname}/../web-resources/ckeditor`),)

  app.use(fileUpload())
  app.use('/api', apiRouter.router)
  definitionsApi.init(app)

  app.use('/style', express.static(`${__dirname}/../dist/style`))
  app.use('/js', express.static(`${__dirname}/../dist/js`))
  app.use(/^\/$/, async (req, res) => {
    if (req.user) {
      const defaultCountry = await countryRepository.getFirstAllowedCountry(req.user.roles)
      res.redirect(`${appUri}/country/${defaultCountry.countryIso}/`)
    } else {
      res.redirect(`${appUri}/login/`)
    }
  })

  app.use('/*', express.static(path.resolve(__dirname, '..', 'dist')))

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
