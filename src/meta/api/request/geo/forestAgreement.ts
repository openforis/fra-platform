import { Request } from 'express'

import { CountryIso } from 'meta/area/countryIso'
import { LayerSource } from 'meta/geo/layer/source'

export type ForestAgreementLayerRequest = Request<
  never,
  never,
  {
    countryIso: CountryIso
    gteAgreementLevel: number
    layers: Array<LayerSource>
  },
  never
>

export type ForestAgreementAreaEstimationRequestBody = {
  countryIso: CountryIso
  gteAgreementLevel: number
  layers: Array<LayerSource>
  scale: number
}

export type ForestAgreementAreaEstimationRequest = Request<
  never,
  never,
  ForestAgreementAreaEstimationRequestBody,
  never
>
