import { Request } from 'express'

import { CountryIso } from '@meta/area'
import { ForestSource } from '@meta/geo'

export type ForestLayerRequest = Request<
  never,
  never,
  never,
  {
    countryIso: CountryIso
    forestSource: ForestSource
    gteHansenTreeCoverPerc?: any
    onlyProtected: any
    opacity: any
  }
>

export type ForestAgreementLayerRequest = Request<
  never,
  never,
  never,
  {
    countryIso: CountryIso
    gteAgreementLevel: any
    gteHansenTreeCoverPerc?: any
    layer: Array<ForestSource>
    opacity: any
  }
>

export type ForestEstimationsRequest = Request<
  never,
  never,
  never,
  {
    countryIso: CountryIso
    year: any
  }
>
