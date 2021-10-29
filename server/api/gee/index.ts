import { Express } from 'express'
import { GeeApiCountry } from '@server/api/gee/country'

export const GeeApi = {
  init: (express: Express): void => {
    GeeApiCountry.init(express)
  },
}
