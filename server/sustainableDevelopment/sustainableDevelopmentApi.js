const Promise = require('bluebird')
const R = require('ramda')

const {checkCountryAccessFromReqParams} = require('../utils/accessControl')
const {sendErr} = require('../utils/requestUtils')

const {getFraValues} = require('../eof/api')
const {readObject} = require('../traditionalTable/traditionalTableRepository')

module.exports.init = app => {

  app.get('/sustainableDevelopment/:countryIso', async (req, res) => {
    checkCountryAccessFromReqParams(req)
    try {
      const countryIso = req.params.countryIso
      const extentOfForest = await getFraValues('extentOfForest', countryIso)
      const bioMass = await readObject(countryIso, 'biomassStock')
      const aboveGroundOnlyBiomass = R.path(['forestAboveGround'], bioMass)
      const forestAreaWithinProtectedAreasAllFields = await readObject(countryIso, 'forestAreaWithinProtectedAreas')
      const forestAreaWithinProtectedAreas = R.pick(
        [
          'forestAreaWithinProtectedAreas',
          'forestAreaWithLongTermManagementPlan'
        ],
        forestAreaWithinProtectedAreasAllFields || {}
      )
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
