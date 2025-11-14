import { createAction } from '@reduxjs/toolkit'

import { ForestEstimationEntry } from 'meta/geo/forest/estimationEntry'

type Params = {
  forestEstimationsTableData: Array<ForestEstimationEntry>
}

export const setForestEstimationsTableData = createAction<Params>('geo/statistics/setForestEstimationsTableData')
