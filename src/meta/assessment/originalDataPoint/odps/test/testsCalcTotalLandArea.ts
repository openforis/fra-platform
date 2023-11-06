import { calcTotalLandArea } from 'meta/assessment/originalDataPoint/odps/calc'

import { odp1 } from './mock/odp1'
import { odp10 } from './mock/odp10'
import { odp11 } from './mock/odp11'

export const testsCalcTotalLandArea = [
  {
    name: 'calcTotalLandArea - 1: all parent values null, return null',
    odp: odp10,
    expected: undefined as ReturnType<typeof calcTotalLandArea>,
  },
  {
    name: 'calcTotalLandArea - 2: single value exists, return value',
    odp: odp11,
    expected: 3100,
  },
  {
    name: 'calcTotalLandArea - 3: all forest and owl are 100, remaining land area is 0, return 0',
    odp: odp1,
    expected: 0,
  },
]
