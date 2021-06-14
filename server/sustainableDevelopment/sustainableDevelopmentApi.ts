// @ts-ignore
import * as camelize from 'camelize'

import * as R from 'ramda'

import { read } from '@server/repository/dataTable/read'
import { Requests } from '@server/utils'

import { getFraValues } from '../eof/fraValueService'

import * as VersionService from '../service/versioning/service'

// TODO: Deprecated?
// Read an object instead of the matrix that plain read returns.
// This can be used when you need programmatical access to the data
// outside of the automated traditionalTable FW (in other views or calculations)
export const readObject = async (countryIso: any, tableSpecName: any, schemaName = 'public') => {
  const rows = await read(countryIso, tableSpecName, schemaName)
  if (rows === null) return null
  return R.pipe(
    R.values,
    R.map((row: any) => [row.row_name, R.dissoc('row_name', row)]),
    R.fromPairs,
    camelize
  )(rows)
}

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
      Requests.sendErr(res, err)
    }
  })
}
