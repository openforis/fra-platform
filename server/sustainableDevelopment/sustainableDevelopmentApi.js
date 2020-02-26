const R = require('ramda')

const {sendErr} = require('../utils/requestUtils')

const {getFraValues} = require('../eof/fraValueService')
const {readObject} = require('../traditionalTable/traditionalTableRepository')

const VersionService = require('../versioning/service')

module.exports.init = app => {

  app.get('/sustainableDevelopment/:countryIso', async (req, res) => {
    try {
      const schemaName = await VersionService.getDatabaseSchema(req)
      const countryIso = req.params.countryIso
      const extentOfForest = await getFraValues('extentOfForest', countryIso, schemaName)
      const bioMass = await readObject(countryIso, 'biomassStock', schemaName)
      const aboveGroundOnlyBiomass = R.path(['forestAboveGround'], bioMass)
      const forestAreaWithinProtectedAreasAllFields = await readObject(countryIso, 'forestAreaWithinProtectedAreas', schemaName)
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
