import * as R from 'ramda'
import * as fs from 'fs'
import { sendErr } from '../utils/requestUtils'

const fileName = 'calculator'

import * as Auth from '../auth/authApiMiddleware'

export const init = (app: any) => {
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
        const filePath = `${__dirname}/../static/biomassStock/${fileName}_${countryDomain}_${lang}.xlsx`
        const fallbackFilePath = `${__dirname}/../static/biomassStock/${fileName}_${countryDomain}_en.xlsx`

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
