import { createAction } from '@reduxjs/toolkit'

import { MosaicOptions } from 'meta/geo'

type Params<K extends keyof MosaicOptions = keyof MosaicOptions> = {
  key: K
  value: MosaicOptions[K]
}

export const setUiOption = createAction<Params>('geo/mosaic/ui/set')
