import { Express } from 'express'
import { GeeApiCountryGetLimits } from './getLimits'

export const GeeApiCountry = {
  init: (express: Express): void => {
    GeeApiCountryGetLimits.init(express)
  },
}
