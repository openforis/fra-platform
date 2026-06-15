import { CountryIso } from 'meta/area/countryIso'
import { ODPs } from 'meta/assessment/odps'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint/originalDataPoint'
import { Numbers } from 'utils/numbers'

const countryIso = 'ATL' as CountryIso

const t = Numbers.toBigNumber

describe('OriginalDataPoint test:', () => {
  test('calculates correct total forest amount', () => {
    const originalDataPoint: OriginalDataPoint = {
      id: 1,
      comments: {},
      countryIso,
      nationalClasses: [
        { area: '200', forestPercent: '50' },
        { area: '1000', forestPercent: '10' },
        { area: null, forestPercent: '5' },
        { area: '400', forestPercent: null },
      ],
      uuid: '1',
      values: {},
    }
    expect(ODPs.calcTotalFieldArea({ originalDataPoint, field: 'forestPercent' })).toEqual(t(200.0))
  })

  test('allows copying values only for empty odp', () => {
    const originalDataPoint: OriginalDataPoint = {
      id: 1,
      comments: {},
      countryIso,
      nationalClasses: [{ name: '' }],
      uuid: '1',
      values: {},
    }
    expect(ODPs.canCopyPreviousValues(originalDataPoint)).toEqual(true)
  })

  test('disallows copying of values if odp has named national classes', () => {
    const originalDataPoint: OriginalDataPoint = {
      id: 1,
      comments: {},
      countryIso,
      nationalClasses: [{ name: 'national class 1' }],
      uuid: '1',
      values: {},
    }
    expect(ODPs.canCopyPreviousValues(originalDataPoint)).toEqual(false)
  })
})
