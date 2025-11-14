import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { Bounds } from 'meta/geo/bounds'

import { BaseProtocol, DB } from 'server/db/db'

export const getOne = async (props: { countryIso: CountryIso }, client: BaseProtocol = DB): Promise<Bounds> => {
  const { countryIso } = props

  const bounds = await client.oneOrNone<Bounds>(
    `
          select b.country_iso, b.data
          from geo.bounds b
          where b.country_iso = $1
      `,
    [countryIso],
    Objects.camelize
  )
  return bounds
}
