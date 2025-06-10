import { createAction } from '@reduxjs/toolkit'

import { ODPReservedYear } from 'meta/assessment/originalDataPoint'

export const setReservedYears = createAction<Array<ODPReservedYear>>('data/originalDataPoint/reservedYears/set')
