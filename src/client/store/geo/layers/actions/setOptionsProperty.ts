import { createAction } from '@reduxjs/toolkit'

import { LayerKey } from 'meta/geo'

import { LayerStateOptions } from 'client/store/geo/layers/state'

type Params = KeyedValue<LayerStateOptions> & { layerKey: LayerKey }

export const setOptionsProperty = createAction<Params>('geo/layers/setOptionsProperty')
