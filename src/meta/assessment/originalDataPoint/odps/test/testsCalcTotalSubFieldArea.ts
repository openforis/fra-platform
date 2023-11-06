import { Numbers } from 'utils/numbers'

import { ODPNationalClass } from 'meta/assessment/originalDataPoint/odpNationalClass'
import { calcTotalSubFieldArea } from 'meta/assessment/originalDataPoint/odps/calc'

import { odp1 } from './mock/odp1'
import { odp8 } from './mock/odp8'
import { odp9 } from './mock/odp9'

export const testsCalcTotalSubFieldArea = [
  {
    name: 'calcTotalSubFieldArea - 1: all subfield values empty, return null',
    odp: odp8,
    field: 'forestPercent' as keyof ODPNationalClass,
    subField: 'forestPlantationPercent' as keyof ODPNationalClass,
    expected: null as ReturnType<typeof calcTotalSubFieldArea>,
  },
  {
    name: 'calcTotalSubFieldArea - 2: single value exists, return value',
    odp: odp9,
    field: 'forestPercent' as keyof ODPNationalClass,
    subField: 'forestPlantationPercent' as keyof ODPNationalClass,
    expected: Numbers.toBigNumber('75'),
  },
  {
    name: 'calcTotalSubFieldArea - 3: all values exist, return value',
    odp: odp1,
    field: 'forestPercent' as keyof ODPNationalClass,
    subField: 'forestPlantationPercent' as keyof ODPNationalClass,
    expected: Numbers.toBigNumber('2950'),
  },
]
