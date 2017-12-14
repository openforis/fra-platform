const Promise = require('bluebird')
const R = require('ramda')

const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendErr} = require('../utils/requestUtils')

const {getFraValues} = require('../eof/api')
const {read} = require('../traditionalTable/traditionalTableRepository')

module.exports.init = app => {

  app.get('/sustainableDevelopment/:countryIso', (req, res) => {
    checkCountryAccessFromReqParams(req)

    const countryIso = req.params.countryIso

    const extentOfForestPromise = getFraValues('extentOfForest', countryIso)
    const biomassStockPromise = read(countryIso, 'biomassStock')
    const forestAreaWithinProtectedAreasPromise = read(countryIso, 'forestAreaWithinProtectedAreas')

    Promise
      .all([
        extentOfForestPromise,
        biomassStockPromise,
        forestAreaWithinProtectedAreasPromise
      ])
      .then(result => res.json({
        extentOfForest: result[0].fra,
        biomassStock: result[1],
        forestAreaWithinProtectedAreas: result[2]
      }))
      .catch(err => sendErr(res, err))

  })
}
