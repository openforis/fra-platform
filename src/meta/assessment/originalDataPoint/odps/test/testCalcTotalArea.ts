import { Numbers } from 'utils/numbers'

import { calcTotalArea } from 'meta/assessment/originalDataPoint/odps/calc'

import { odp1 } from './mock/odp1'
import { odp4 } from './mock/odp4'
import { odp5 } from './mock/odp5'

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
