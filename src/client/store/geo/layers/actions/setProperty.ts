import { createAction } from '@reduxjs/toolkit'

import { LayerKey } from 'meta/geo'
import { KeyedValue } from 'meta/utils/generics'

import { LayerState } from 'client/store/geo/layers/state'

export type Params = KeyedValue<LayerState> & { layerKey: LayerKey }

export const setProperty = createAction<Params>('geo/layers/setProperty')
