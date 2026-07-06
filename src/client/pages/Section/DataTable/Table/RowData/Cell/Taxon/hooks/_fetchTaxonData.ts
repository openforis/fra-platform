import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Taxon } from 'meta/extData/taxon'

type Returned = Array<Taxon>

export const fetchTaxonData = async (query: string): Promise<Returned> => {
  const { data } = await axios.get<Returned>(ApiEndPoint.ExtData.Taxa.search(), {
    params: {
      limit: 15,
      query,
    },
  })
  return data
}
