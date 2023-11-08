import { ODPNationalClass } from '../../odpNationalClass'
import {
  calcTotalArea,
  calcTotalFieldArea,
  calcTotalLandArea,
  calcTotalSubFieldArea,
  calcTotalSubSubFieldArea,
} from '../calc'
import { testsCalcTotalArea } from './testCalcTotalArea'
import { testsCalcTotalSubSubFieldArea } from './testCalcTotalSubSubFieldArea'
import { testsCalcTotalFieldArea } from './testsCalcTotalFieldArea'
import { testsCalcTotalLandArea } from './testsCalcTotalLandArea'
import { testsCalcTotalSubFieldArea } from './testsCalcTotalSubFieldArea'

describe('ODPs.calc', () => {
  testsCalcTotalArea.forEach((_test) => {
    test(_test.name, () => {
      const props = { originalDataPoint: _test.odp }
      const result = calcTotalArea(props)
      expect(result).toEqual(_test.expected)
    })
  })

  testsCalcTotalFieldArea.forEach((_test) => {
    test(_test.name, () => {
      const props = { originalDataPoint: _test.odp, field: _test.field }
      const result = calcTotalFieldArea(props)
      expect(result).toEqual(_test.expected)
    })
  })

  testsCalcTotalSubFieldArea.forEach((_test) => {
    test(_test.name, () => {
      const props = { originalDataPoint: _test.odp, field: _test.field, subField: _test.subField }
      const result = calcTotalSubFieldArea(props)
      expect(result).toEqual(_test.expected)
    })
  })

  testsCalcTotalSubSubFieldArea.forEach((_test) => {
    test(_test.name, () => {
      const props = {
        originalDataPoint: _test.odp,
        field: 'forestPercent' as keyof ODPNationalClass,
        subField: 'forestNaturalPercent' as keyof ODPNationalClass,
        subSubField: 'forestNaturalForestOfWhichPrimaryForestPercent' as keyof ODPNationalClass,
      }
      const result = calcTotalSubSubFieldArea(props)
      expect(result).toEqual(_test.expected)
    })
  })

  testsCalcTotalLandArea.forEach((_test) => {
    test(_test.name, () => {
      const props = { originalDataPoint: _test.odp }
      const result = calcTotalLandArea(props)
      expect(result).toEqual(_test.expected)
    })
  })
})
