import { createAction } from '@reduxjs/toolkit'
import { ODP } from '@core/odp'

export const setODP = createAction<ODP>('originalDataPoint/setODP')
