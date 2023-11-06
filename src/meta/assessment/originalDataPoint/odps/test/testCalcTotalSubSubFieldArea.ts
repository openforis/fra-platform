import { Numbers } from 'utils/numbers'

import { odp1, odp2, odp3 } from 'meta/assessment/originalDataPoint/odps/test/mockODP'

export const testsCalcTotalSubSubFieldArea = [
  {
    name: 'calcTotalSubSubFieldArea - 1: all parent values 0, return 0',
    odp: odp1,
    expected: Numbers.toBigNumber('0'),
  },
  {
    name: 'calcTotalSubSubFieldArea - 2: parent value exist, child value empty, return null',
    odp: odp2,
    expected: null,
  },
  {
    name: 'calcTotalSubSubFieldArea - 3: parent values exist, child value empty, child value filled, return value',
    odp: odp3,
    expected: Numbers.BigNumber('375'),
  },
]
