import { createAction } from '@reduxjs/toolkit'

import { LayerKey } from 'meta/geo/layer/key'

export type Params = { layerKey: LayerKey }

export const resetLayerStatus = createAction<Params>('geo/layers/resetLayerStatus')
