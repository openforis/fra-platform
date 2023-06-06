import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { ForestEstimations } from 'meta/geo'

import { BaseProtocol, DB } from 'server/db'

export const getOne = async (
  props: { countryIso: CountryIso; year: number },
  client: BaseProtocol = DB
): Promise<ForestEstimations> => {
  const { countryIso, year } = props

  const forestEstimations = await client.oneOrNone<ForestEstimations>(
    `
          select fe.*
          from geo.forest_estimations fe
          where fe.country_iso = $1
            and fe.year = $2;
      `,
    [countryIso, year],
    Objects.camelize
  )
  return forestEstimations
}
