import { createAction } from '@reduxjs/toolkit'

import { ForestEstimationEntry } from 'meta/geo/geoStatistics'

type Params = {
  forestEstimationsTableData: Array<ForestEstimationEntry>
}

export const setForestEstimationsTableData = createAction<Params>('geo/statistics/setForestEstimationsTableData')
