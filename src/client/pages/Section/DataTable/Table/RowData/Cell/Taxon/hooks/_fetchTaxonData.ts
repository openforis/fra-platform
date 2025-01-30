import axios from 'axios'
import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Taxon } from 'meta/extData'

type Returned = Array<Taxon>

export const fetchTaxonData = async (query: string): Promise<Returned> => {
  if (Objects.isEmpty(query)) return []
  const { data } = await axios.get<Returned>(ApiEndPoint.ExtData.Taxa.search(), {
    params: {
      limit: 15,
      query,
    },
  })
  return data
}
