import { LayerKey } from 'meta/geo'

import { LayerState } from 'client/store/ui/geo/stateType'

export type LayersState = Record<LayerKey, LayerState>

export const initialState = {} as LayersState
