import { Express } from 'express'
import { TraditionalTableCreate } from '@server/api/traditionalTable/create'
import { TraditionalTableGet } from '@server/api/traditionalTable/get'

export const TraditionalTableApi = {
  init: (express: Express): void => {
    TraditionalTableCreate.init(express)
    TraditionalTableGet.init(express)
  },
}
