import { Express } from 'express'

import { ApiEndPoint } from 'meta/api/endpoint'

import { searchTaxa } from 'server/api/extData/searchTaxa'

export const ExtDataApi = {
  init: (express: Express): void => {
    // Taxa
    express.get(ApiEndPoint.ExtData.Taxa.search(), searchTaxa)
  },
}
