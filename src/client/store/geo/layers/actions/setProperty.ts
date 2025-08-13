import { createAction } from '@reduxjs/toolkit'

import { LayerKey } from 'meta/geo'

import { LayerState } from 'client/store/ui/geo/stateType'

// Property key to set, and its value type
export type Params = {
  [K in keyof LayerState]: {
    layerKey: LayerKey
    propertyKey: K
    value: LayerState[K]
  }
}[keyof LayerState]

export const setProperty = createAction<Params>('geo/layers/setProperty')
