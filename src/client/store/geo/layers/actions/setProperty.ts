import { createAction } from '@reduxjs/toolkit'
import { KeyedValue } from 'utils/types'

import { LayerKey } from 'meta/geo'

import { LayerState } from 'client/store/geo/layers/state'

export type Params = KeyedValue<LayerState> & { layerKey: LayerKey }

export const setProperty = createAction<Params>('geo/layers/setProperty')
