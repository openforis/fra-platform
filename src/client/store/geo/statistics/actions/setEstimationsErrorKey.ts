import { createAction } from '@reduxjs/toolkit'

type Params = {
  errorKey: string
}

export const setEstimationsErrorKey = createAction<Params>('geo/statistics/setEstimationsErrorKey')
