import { createAction } from '@reduxjs/toolkit'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

export const setNationalDataPoint = createAction<OriginalDataPoint>('data/originalDataPoint/set')
