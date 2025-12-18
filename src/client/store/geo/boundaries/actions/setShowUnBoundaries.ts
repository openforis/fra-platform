import { createAction } from '@reduxjs/toolkit'

export type Params = { show: boolean }

export const setShowUnBoundaries = createAction<Params>('geo/boundaries/setShowUnBoundaries')
