import * as fs from 'fs/promises'
import * as path from 'path'
import { config } from 'dotenv'
import * as pgPromise from 'pg-promise'

import { CountryIso } from '../../src/meta/area'
import { DB } from '../../src/server/db'
import { Objects } from '../../src/utils/objects'

type Response = {
  features: Array<{
    geometry: any
    properties: {
      fa_agreement_esri_esa_glo_hansen10_gte_1: number
      fa_agreement_esri_esa_glo_hansen10_gte_2: number
      fa_agreement_esri_esa_glo_hansen10_gte_3: number
      fa_agreement_esri_esa_glo_hansen10_gte_4: number
      fa_agreement_esri_esa_gte_1: number
      fa_agreement_esri_esa_gte_2: number
      fa_agreement_hansen10_gte_1: number
      fa_agreement_hansen10_gte_2: number
      fa_agreement_hansen10_gte_3: number
      fa_agreement_hansen10_gte_4: number
      fa_agreement_hansen10_gte_5: number
      fa_agreement_hansen10_gte_6: number
      fa_agreement_hansen10_gte_7: number
      fa_agreement_hansen10_gte_8: number
      fa_agreement_hansen20_gte_1: number
      fa_agreement_hansen20_gte_2: number
      fa_agreement_hansen20_gte_3: number
      fa_agreement_hansen20_gte_4: number
      fa_agreement_hansen20_gte_5: number
      fa_agreement_hansen20_gte_6: number
      fa_agreement_hansen20_gte_7: number
      fa_agreement_hansen20_gte_8: number
      fa_agreement_hansen30_gte_1: number
      fa_agreement_hansen30_gte_2: number
      fa_agreement_hansen30_gte_3: number
      fa_agreement_hansen30_gte_4: number
      fa_agreement_hansen30_gte_5: number
      fa_agreement_hansen30_gte_6: number
      fa_agreement_hansen30_gte_7: number
      fa_agreement_hansen30_gte_8: number
      fa_copernicus: number
      fa_esa_2009: number
      fa_esa_2020: number
      fa_esri: number
      fa_globeland: number
      fa_hansen10: number
      fa_hansen20: number
      fa_hansen30: number
      fa_jaxa: number
      fa_tandemx: number
      fra_1a_forestArea: number
      fra_1a_landArea: number
      fra_3b_protected: number
      iso3: CountryIso
      total_area_ha: number
      year: number
    }
  }>
}

config({ path: path.resolve(__dirname, '..', '..', '.env') })

export const forestIndicatorsImport = async (): Promise<void> => {
  // eslint-disable-next-line no-console
  const content = await fs.readFile(path.resolve(__dirname, 'FRA_236_ISO_GEE.geojson'))
  const response: Response = JSON.parse(content.toString())

  const values = response.features.map((d) => {
    const { properties } = d
    const { iso3, year, ...data } = properties
    return { country_iso: iso3, year, data: Objects.camelize(data) }
  })

  const schema = 'geo'
  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet(['country_iso', 'year', { name: 'data', cast: 'jsonb' }], {
    table: { table: 'forest_estimations', schema },
  })

  const onConflict = ` ON CONFLICT(country_iso, year) DO UPDATE SET ${cs.assignColumns({
    from: 'EXCLUDED',
    skip: ['country_iso', 'year'],
  })}`

  const query = pgp.helpers.insert(values, cs) + onConflict

  await DB.none(query)
}

forestIndicatorsImport()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('=== process finished')
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error)
    process.exit(1)
  })
