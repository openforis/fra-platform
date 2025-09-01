import { createAction } from '@reduxjs/toolkit'

import { MosaicOptions } from 'meta/geo'
import { KeyedValue } from 'meta/utils/generics'

type Params = KeyedValue<MosaicOptions>

export const setOption = createAction<Params>('geo/mosaic/options/set')
