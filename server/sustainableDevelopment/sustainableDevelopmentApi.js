const Promise = require('bluebird')
const R = require('ramda')

const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendErr} = require('../utils/requestUtils')

const {getFraValues} = require('../eof/api')
const {read, readObject} = require('../traditionalTable/traditionalTableRepository')
const sustainableDevelopmentRepository = require('./sustainableDevelopmentRepository')

module.exports.init = app => {

  app.get('/sustainableDevelopment/:countryIso', async (req, res) => {
    checkCountryAccessFromReqParams(req)
    try {
      const countryIso = req.params.countryIso

      const extentOfForest = await getFraValues('extentOfForest', countryIso)
      const forestAreaWithinProtectedAreas = await read(countryIso, 'forestAreaWithinProtectedAreas')

      const bioMass = await readObject(countryIso, 'biomassStock')
      const aboveGroundOnlyBiomass = R.path(['forestAboveGround'], bioMass)
      //const forestAreaWithinProtectedAreas = await readObject(countryIso, 'forestAreaWithinProtectedAreas')
      res.json({
        extentOfForest: extentOfForest.fra,
        biomassStock: aboveGroundOnlyBiomass,
        forestAreaWithinProtectedAreas: forestAreaWithinProtectedAreas
      })
    } catch (err) {
      sendErr(res, err)
    }
  })
}
