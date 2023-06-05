import { Request } from 'express'

import { CountryIso } from 'meta/area'

export type BiomassStockFileRequest = Request<
  never,
  never,
  never,
  { language: string; selectedDomain: string; countryIso: CountryIso; assessmentName: string; cycleName: string }
>
