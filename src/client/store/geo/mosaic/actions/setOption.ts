import { createAction } from '@reduxjs/toolkit'

import { MosaicOptions } from 'meta/geo'

// Property key to set, and its value type
type Params = {
  [K in keyof MosaicOptions]: {
    key: K
    value: MosaicOptions[K]
  }
}[keyof MosaicOptions]

export const setOption = createAction<Params>('geo/mosaic/options/set')
