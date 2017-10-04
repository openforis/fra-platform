const R = require('ramda')
const fs = require('fs')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

const mapping = require('./countriesDomainMapping')
const fileName = 'calculator'

module.exports.init = app => {

  app.get('/biomassStock/:countryIso/:lang/download', (req, res) => {
    checkCountryAccessFromReqParams(req)
    const availableLanguages = ['en', 'fr', 'es', 'ru']
    const countryDomain = R.find(R.propEq('countryIso', req.params.countryIso), mapping)
    const domain = countryDomain.domain
    const lang = R.contains(req.params.lang, availableLanguages) ? req.params.lang : 'en'
    const filePath = `${__dirname}/${fileName}_${domain}_${lang}.xlsx`
    const fallbackFilePath = `${__dirname}/${fileName}_${domain}_en.xlsx`

    if (fs.existsSync(filePath)) {
      res.download(filePath, 'BiomassCalculator.xlsx')
    } else if (lang !== 'en' && fs.existsSync(fallbackFilePath)) {
      res.download(fallbackFilePath, 'BiomassCalculator.xlsx')
    } else {
      res.status(404).send('404 / File not found')
    }
  })
}
