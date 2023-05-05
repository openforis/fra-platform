import * as fs from 'fs/promises'
import * as path from 'path'
import { config } from 'dotenv'
import * as pgPromise from 'pg-promise'

import { CountryIso } from '../../src/meta/area'
import { DB } from '../../src/server/db'

type Response = {
  features: Array<{
    geometry: any
    properties: {
      iso3: CountryIso
      bounds: any
      centroid: any
    }
  }>
}

config({ path: path.resolve(__dirname, '..', '..', '.env') })

export const boundsImport = async (): Promise<void> => {
  // eslint-disable-next-line no-console
  const content = await fs.readFile(path.resolve(__dirname, 'FRA_236_ISO_GEE_Bounds.geojson'))
  const response: Response = JSON.parse(content.toString())

  const values = response.features.map((d) => {
    const { properties } = d
    const { iso3, ...data } = properties

    const boundsCoords = data.bounds[0]
    const locData = {
      bounds: {
        south: boundsCoords[0][1],
        west: boundsCoords[0][0],
        north: boundsCoords[2][1],
        east: boundsCoords[2][0],
      },
      centroid: {
        lat: data.centroid[1],
        lng: data.centroid[0],
      },
    }

    return { country_iso: iso3, data: locData }
  })

  const schema = 'geo'
  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet(['country_iso', { name: 'data', cast: 'jsonb' }], {
    table: { table: 'bounds', schema },
  })

  const onConflict = ` ON CONFLICT(country_iso) DO UPDATE SET ${cs.assignColumns({
    from: 'EXCLUDED',
    skip: ['country_iso'],
  })}`

  const query = pgp.helpers.insert(values, cs) + onConflict

  await DB.none(query)
}

boundsImport()
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
