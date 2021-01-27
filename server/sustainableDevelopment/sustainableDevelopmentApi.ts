// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'sendErr'.
const { sendErr } = require('../utils/requestUtils')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getFraValu... Remove this comment to see the full error message
const { getFraValues } = require('../eof/fraValueService')
const { readObject } = require('../traditionalTable/traditionalTableRepository')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'VersionSer... Remove this comment to see the full error message
const VersionService = require('../versioning/service')

module.exports.init = (app: any) => {
  app.get('/sustainableDevelopment/:countryIso', async (req: any, res: any) => {
    try {
      const schemaName = await VersionService.getDatabaseSchema(req)
      const { countryIso } = req.params
      const extentOfForest = await getFraValues('extentOfForest', countryIso, schemaName)
      const bioMass = await readObject(countryIso, 'biomassStock', schemaName)
      const aboveGroundOnlyBiomass = R.path(['forestAboveGround'], bioMass)
      const forestAreaWithinProtectedAreasAllFields = await readObject(
        countryIso,
        'forestAreaWithinProtectedAreas',
        schemaName
      )
      const forestAreaWithinProtectedAreas = R.pick(
        ['forestAreaWithinProtectedAreas', 'forestAreaWithLongTermManagementPlan'],
        forestAreaWithinProtectedAreasAllFields || {}
      )
      res.json({
        extentOfForest: extentOfForest.fra,
        biomassStock: aboveGroundOnlyBiomass,
        forestAreaWithinProtectedAreas,
      })
    } catch (err) {
      sendErr(res, err)
    }
  })
}
