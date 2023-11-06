import { Numbers } from 'utils/numbers'

import { calcTotalArea } from 'meta/assessment/originalDataPoint/odps/calc'
import { odp1, odp4, odp5 } from 'meta/assessment/originalDataPoint/odps/test/mockODP'

export const testsCalcTotalArea = [
  {
    name: 'calcTotalArea - 1: all parent values null, return null',
    odp: odp4,
    expected: null as ReturnType<typeof calcTotalArea>,
  },
  {
    name: 'calcTotalArea - 2: single value exists, return value',
    odp: odp5,
    expected: Numbers.toBigNumber('5'),
  },
  {
    name: 'calcTotalArea - 3: all values exist, return value',
    odp: odp1,
    expected: Numbers.toBigNumber('3250'),
  },
]
