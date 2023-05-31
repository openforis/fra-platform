import { CountryIso } from 'meta/area'

import { Numbers } from '../../../utils'
import { ODPs } from './odps'
import { OriginalDataPoint } from './originalDataPoint'

const countryIso = 'ATL' as CountryIso

const t = Numbers.toBigNumber

describe('OriginalDataPoint test:', () => {
  it('calculates correct total forest amount', () => {
    const originalDataPoint: OriginalDataPoint = {
      id: 1,
      countryIso,
      nationalClasses: [
        { area: '200', forestPercent: '50' },
        { area: '1000', forestPercent: '10' },
        { area: null, forestPercent: '5' },
        { area: '400', forestPercent: null },
      ],
    }
    expect(ODPs.calcTotalFieldArea({ originalDataPoint, field: 'forestPercent' })).toEqual(t(200.0))
  })

  // Temporarily disabled, ODP code should no longer round to integer
  xit('rounds decimals to nearest integer', () => {
    const originalDataPoint: OriginalDataPoint = {
      id: 1,
      countryIso,
      nationalClasses: [
        { area: '200', forestPercent: '50' },
        { area: '1002', forestPercent: '10' },
        { area: null, forestPercent: '5' },
        { area: '400', forestPercent: null },
      ],
    }
    expect(ODPs.calcTotalFieldArea({ originalDataPoint, field: 'forestPercent' })).toEqual(200)

    const originalDataPoint2: OriginalDataPoint = {
      id: 2,
      countryIso,
      nationalClasses: [
        { area: '200', forestPercent: '50' },
        { area: '1008', forestPercent: '10' },
        { area: null, forestPercent: '5' },
        { area: '400', forestPercent: null },
      ],
    }
    expect(ODPs.calcTotalFieldArea({ originalDataPoint: originalDataPoint2, field: 'forestPercent' })).toEqual(201)
  })

  it('allows copying values only for empty odp', () => {
    const originalDataPoint: OriginalDataPoint = {
      id: 1,
      countryIso,
      nationalClasses: [{ name: '' }],
    }
    expect(ODPs.canCopyPreviousValues(originalDataPoint)).toEqual(true)
  })

  it('disallows copying of values if odp has named national classes', () => {
    const originalDataPoint: OriginalDataPoint = {
      id: 1,
      countryIso,
      nationalClasses: [{ name: 'national class 1' }],
    }
    expect(ODPs.canCopyPreviousValues(originalDataPoint)).toEqual(false)
  })
})
