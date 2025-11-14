import { createAction } from '@reduxjs/toolkit'

import { MosaicOptions } from 'meta/geo/mosaic/options'

type Params = KeyedValue<MosaicOptions>

export const setOption = createAction<Params>('geo/mosaic/options/set')
