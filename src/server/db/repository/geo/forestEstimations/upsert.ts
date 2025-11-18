import { Objects } from 'utils/objects'

import { ForestEstimations } from 'meta/geo/forest/estimations'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

export const upsert = async (
  props: {
    forestEstimations: ForestEstimations
  },
  client: BaseProtocol = DB
): Promise<string> => {
  const { forestEstimations } = props
  const { countryIso, data, year } = forestEstimations
  const schema = Schemas.getSchemaGeo()

  // insert new | on conflict update
  const query = `
      insert into ${schema}.forest_estimations (country_iso, year, data)
      values ($1, $2, $3::jsonb)
      on conflict (country_iso, year) do update
          set data = $3::jsonb
      returning content;
  `

  return client.oneOrNone<string>(query, [countryIso, year, JSON.stringify(data)], Objects.camelize)
}
