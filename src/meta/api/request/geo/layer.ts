import { Request } from 'express'

import { CountryIso } from 'meta/area'
import { LayerSource } from 'meta/geo'

export type LayerRequestBody = {
  countryIso: CountryIso
  layer: LayerSource
}

export type LayerRequest = Request<never, never, LayerRequestBody, never>

export type ForestAgreementLayerRequest = Request<
  never,
  never,
  {
    countryIso: CountryIso
    layers: Array<LayerSource>
    gteAgreementLevel: number
  },
  never
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
