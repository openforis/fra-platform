import { MosaicOptions } from 'meta/geo'

import { LayerFetchStatus } from 'client/store/ui/geo/stateType'

export type MosaicUrlTemplateData = {
  requestOptions: MosaicOptions
  url: string
}

export type MosaicState = {
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

export const initialState: MosaicState = {
  options: initialMosaicOptions,
}
