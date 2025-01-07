import * as fs from 'fs/promises'
import * as path from 'path'
import { config } from 'dotenv'
import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'

import { DB } from 'server/db'

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
      fa_copernicus_protected: number
      fa_esa_2009_protected: number
      fa_esa_2020_protected: number
      fa_esri_protected: number
      fa_globeland_protected: number
      fa_hansen10_protected: number
      fa_hansen20_protected: number
      fa_hansen30_protected: number
      fa_jaxa_protected: number
      fa_tandemx_protected: number
      fra_1a_forestArea: number
      fra_1a_landArea: number
      fra_3b_protected: number
      iso3: CountryIso
      total_area_ha: number
      year: number
      ba_MODIS_2001: number
      ba_MODIS_2002: number
      ba_MODIS_2003: number
      ba_MODIS_2004: number
      ba_MODIS_2005: number
      ba_MODIS_2006: number
      ba_MODIS_2007: number
      ba_MODIS_2008: number
      ba_MODIS_2009: number
      ba_MODIS_2010: number
      ba_MODIS_2011: number
      ba_MODIS_2012: number
      ba_MODIS_2013: number
      ba_MODIS_2014: number
      ba_MODIS_2015: number
      ba_MODIS_2016: number
      ba_MODIS_2017: number
      ba_MODIS_2018: number
      ba_MODIS_2019: number
      ba_MODIS_2020: number
      ba_MODIS_2021: number
      ba_MODIS_2022: number
      ba_MODIS_2001_Hansen10: number
      ba_MODIS_2002_Hansen10: number
      ba_MODIS_2003_Hansen10: number
      ba_MODIS_2004_Hansen10: number
      ba_MODIS_2005_Hansen10: number
      ba_MODIS_2006_Hansen10: number
      ba_MODIS_2007_Hansen10: number
      ba_MODIS_2008_Hansen10: number
      ba_MODIS_2009_Hansen10: number
      ba_MODIS_2010_Hansen10: number
      ba_MODIS_2011_Hansen10: number
      ba_MODIS_2012_Hansen10: number
      ba_MODIS_2013_Hansen10: number
      ba_MODIS_2014_Hansen10: number
      ba_MODIS_2015_Hansen10: number
      ba_MODIS_2016_Hansen10: number
      ba_MODIS_2017_Hansen10: number
      ba_MODIS_2018_Hansen10: number
      ba_MODIS_2019_Hansen10: number
      ba_MODIS_2020_Hansen10: number
      ba_MODIS_2021_Hansen10: number
      ba_MODIS_2022_Hansen10: number
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
    const cdata: any = JSON.parse(JSON.stringify(data))
    const baEntries: Array<{ year: number; ba: number; fbaHansen10: number }> = []
    // Create array with burned area and burned area within forest estimations per year from GEE asset columns
    for (let i = 2001; i <= 2022; i += 1) {
      type ObjectKey = keyof typeof data
      const baKey = `ba_MODIS_${i}` as ObjectKey
      const fbaKey = `ba_MODIS_${i}_Hansen10` as ObjectKey
      baEntries.push({ year: i, ba: data[baKey], fbaHansen10: data[fbaKey] })
      cdata.burnedAreaMODIS = baEntries
      delete cdata[baKey]
      delete cdata[fbaKey]
    }
    return { country_iso: iso3, year, data: Objects.camelize(cdata) }
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
    process.exit(0)
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error)
    process.exit(1)
  })
