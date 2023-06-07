import { Objects } from 'utils/objects'

import { Taxon } from 'meta/extData'

import { BaseProtocol, DB } from 'server/db'

export const search = async (
  props: { query: string; limit: string },
  client: BaseProtocol = DB
): Promise<Array<Taxon>> => {
  const { limit, query } = props

  return client.map<Taxon>(
    `
        select *
        from ext_data.taxon t
        where t.scientific_name ilike '%$1:value%'
        order by scientific_name
        limit $2
    `,
    [query, limit],
    (row) => Objects.camelize(row)
  )
}
