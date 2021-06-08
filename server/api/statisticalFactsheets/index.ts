import { Express } from 'express'

import { StatisticalFactsheetsGet } from './get'

export const StatisticalFactsheetsApi = {
  init: (express: Express): void => {
    StatisticalFactsheetsGet.init(express)
  },
}
