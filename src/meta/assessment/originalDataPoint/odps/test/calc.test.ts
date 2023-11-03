import { Numbers } from 'utils/numbers'

import { calcTotalSubSubFieldArea } from 'meta/assessment/originalDataPoint/odps/calc'

import { odp1, odp2, odp3 } from './mockODP'

const testsCalcTotalSubSubFieldArea = [
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

describe('ODPs.calc', () => {
  testsCalcTotalSubSubFieldArea.forEach((_test) => {
    test(_test.name, () => {
      const result = calcTotalSubSubFieldArea({
        originalDataPoint: _test.odp,
        field: 'forestPercent',
        subField: 'forestNaturalPercent',
        subSubField: 'forestNaturalForestOfWhichPrimaryForestPercent',
      })
      expect(result).toEqual(_test.expected)
    })
  })

  // TODO: test calcTotalArea
  // TODO: test calcTotalFieldArea
  // TODO: test calcTotalSubFieldArea
  // TODO: test calcTotalSubSubFieldArea
  // TODO: test calcTotalLandArea
})
