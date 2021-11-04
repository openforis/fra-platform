import { Express } from 'express'
import { GeoApiCountryGetLimits } from './getLimits'

export const GeoApiCountry = {
  init: (express: Express): void => {
    GeoApiCountryGetLimits.init(express)
  },
}
