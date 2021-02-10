import * as R from 'ramda'

import { sendErr } from '../utils/requestUtils'

import { getFraValues } from '../eof/fraValueService'
import { readObject } from '../traditionalTable/traditionalTableRepository'

import * as VersionService from '../versioning/service'

export const init = (app: any) => {
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
