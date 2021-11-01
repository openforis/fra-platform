import { createAction } from '@reduxjs/toolkit'
import { ODP } from '@core/odp'

export const setODPs = createAction<Array<ODP>>('originalDataPoint/setODPs')
