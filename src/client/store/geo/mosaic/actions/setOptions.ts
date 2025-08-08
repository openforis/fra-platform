import { createAction } from '@reduxjs/toolkit'

import { MosaicOptions } from 'meta/geo'

type Params = { datum: Partial<MosaicOptions> } // Redux can't infer types correctly when passing Partial<> directly

export const setOptions = createAction<Params>('geo/mosaic/options/set')
