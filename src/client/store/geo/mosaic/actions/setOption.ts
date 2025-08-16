import { createAction } from '@reduxjs/toolkit'
import { KeyedValue } from 'utils/types'

import { MosaicOptions } from 'meta/geo'

type Params = KeyedValue<MosaicOptions>

export const setOption = createAction<Params>('geo/mosaic/options/set')
