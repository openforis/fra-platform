import { Request } from 'express'

import { CountryIso } from 'meta/area/countryIso'

export type ForestEstimationsRequest = Request<
  never,
  never,
  never,
  {
    countryIso: CountryIso
    year: string
  }
>
