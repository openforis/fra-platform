const R = require('ramda')
const {checkCountryAccessFromReqParams} = require('../utils/accessControl')

const mapping = require('./countriesDomainMapping')
const fileName = 'BiomassCalculator'

module.exports.init = app => {

  app.get('/biomassStock/:countryIso/:lang/download', (req, res) => {
    checkCountryAccessFromReqParams(req)

    const countryDomain = R.find(R.propEq('countryIso', req.params.countryIso), mapping)
    const domain = countryDomain.domain
    const lang = req.params.lang

    const filePath = `${__dirname}/${domain}/${fileName}_${lang}.xlsx`

    res.download(filePath, 'BiomassCalculator.xlsx')

  })
}
