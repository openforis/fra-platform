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
    gteAgreementLevel: string
    gteHansenTreeCoverPerc?: string
    layer: Array<ForestSource>
    opacity: string
  }
>
