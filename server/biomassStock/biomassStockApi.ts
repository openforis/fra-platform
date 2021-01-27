// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
const fs = require('fs')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr } = require('../utils/requestUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fileName'.
const fileName = 'calculator'

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Auth'.
const Auth = require('../auth/authApiMiddleware')

module.exports.init = (app: any) => {
  app.get(
    '/biomassStock/:countryIso/:domain/:lang/download',
    Auth.requireCountryEditPermission,
    (req: any, res: any) => {
      try {
        const availableLanguages = ['en', 'fr', 'es', 'ru']
        const countryDomain = req.params.domain
        if (R.isNil(countryDomain)) {
          res.status(500).json({ error: `Could not find domain for country ${req.params.countryIso}` })
          return
        }
        const lang = R.contains(req.params.lang, availableLanguages) ? req.params.lang : 'en'
        const filePath = `${__dirname}/${fileName}_${countryDomain}_${lang}.xlsx`
        const fallbackFilePath = `${__dirname}/${fileName}_${countryDomain}_en.xlsx`

        if (fs.existsSync(filePath)) {
          res.download(filePath, 'BiomassCalculator.xlsx')
        } else if (lang !== 'en' && fs.existsSync(fallbackFilePath)) {
          res.download(fallbackFilePath, 'BiomassCalculator.xlsx')
        } else {
          res.status(404).send('404 / File not found')
        }
      } catch (err) {
        sendErr(res, err)
      }
    }
  )
}
