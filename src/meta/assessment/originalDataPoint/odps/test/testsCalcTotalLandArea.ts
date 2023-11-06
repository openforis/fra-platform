import { calcTotalLandArea } from 'meta/assessment/originalDataPoint/odps/calc'
import { odp1, odp10, odp11 } from 'meta/assessment/originalDataPoint/odps/test/mockODP'

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
