import { MosaicOptions } from 'meta/geo'

import { LayerFetchStatus } from 'client/store/geo/layers/state'

export type MosaicUrlTemplateData = {
  requestOptions: MosaicOptions
  url: string
}

export type GeoMosaicState = {
  options: MosaicOptions
  selected?: boolean
  status?: LayerFetchStatus
  urlTemplateData?: MosaicUrlTemplateData
}

const initialMosaicOptions: MosaicOptions = {
  maxCloudCoverage: 30,
  snowMasking: false,
  sources: { landsat: true },
  year: 2020,
}

export const initialState: GeoMosaicState = {
  options: initialMosaicOptions,
}
