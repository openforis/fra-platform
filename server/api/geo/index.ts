import { Express } from 'express'
import { GeoApiCountry } from '@server/api/geo/country'

export const GeoApi = {
  init: (express: Express): void => {
    GeoApiCountry.init(express)
  },
}
