import { createAction } from '@reduxjs/toolkit'
import { KeyedValue } from 'utils/types'

import { LayerStateOptions } from 'client/store/geo/layers/state'

type Params = KeyedValue<LayerStateOptions>

export const setOptionsProperty = createAction<Params>('geo/layers/setOptionsProperty')
