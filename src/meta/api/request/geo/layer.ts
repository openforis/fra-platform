import { Request } from 'express'

import { CountryIso } from 'meta/area/countryIso'
import { LayerSource } from 'meta/geo/layer/source'

export type LayerRequestBody = {
  countryIso: CountryIso
  layer: LayerSource
}

export type LayerRequest = Request<never, never, LayerRequestBody, never>
