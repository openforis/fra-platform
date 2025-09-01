import { createAction } from '@reduxjs/toolkit'

import { GeoMapOptions } from 'client/store/geo/map/state'

type Params = { datum: Partial<GeoMapOptions> } // Redux can't infer types correctly when passing Partial<> directly

export const setOptions = createAction<Params>('geo/map/options/set')
