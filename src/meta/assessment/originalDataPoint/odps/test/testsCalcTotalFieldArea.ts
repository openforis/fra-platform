import { Numbers } from 'utils/numbers'

import { ODPNationalClass } from 'meta/assessment/originalDataPoint/odpNationalClass'
import { calcTotalFieldArea } from 'meta/assessment/originalDataPoint/odps/calc'

import { odp1 } from './mock/odp1'
import { odp6 } from './mock/odp6'
import { odp7 } from './mock/odp7'

export const testsCalcTotalFieldArea = [
  {
    name: 'calcTotalFieldArea - 1: all parent values empty, return null',
    odp: odp6,
    field: 'forestPercent' as keyof ODPNationalClass,
    expected: null as ReturnType<typeof calcTotalFieldArea>,
  },
  {
    name: 'calcTotalFieldArea - 2: single value exists, return value',
    odp: odp7,
    field: 'forestPercent' as keyof ODPNationalClass,
    expected: Numbers.toBigNumber('75'),
  },
  {
    name: 'calcTotalFieldArea - 3: all values exist, return value',
    odp: odp1,
    field: 'forestPercent' as keyof ODPNationalClass,
    expected: Numbers.toBigNumber('2950'),
  },
]
