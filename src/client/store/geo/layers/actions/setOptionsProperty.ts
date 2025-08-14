import { createAction } from '@reduxjs/toolkit'

import { LayerKey } from 'meta/geo'

import { LayerStateOptions } from 'client/store/ui/geo/stateType'

// Property key to set, and its value type
type Params = {
  [K in keyof LayerStateOptions]: {
    layerKey: LayerKey
    propertyKey: K
    value: LayerStateOptions[K]
  }
}[keyof LayerStateOptions]

export const setOptionsProperty = createAction<Params>('geo/layers/setOptionsProperty')
