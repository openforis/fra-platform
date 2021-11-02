import { assert } from 'chai'

import { ODP, ODPs } from '@core/odp'

describe('originalDataPoint', () => {
  it('calculates correct total forest amount', () => {
    const odp: ODP = {
      nationalClasses: [
        { area: '200', forestPercent: '50' },
        { area: '1000', forestPercent: '10' },
        { area: null, forestPercent: '5' },
        { area: '400', forestPercent: null },
      ],
    }
    assert.equal(200.0, ODPs.calcTotalFieldArea({ odp, field: 'forestPercent' }))
  })

  // Temporarily disabled, ODP code should no longer round to integer
  xit('rounds decimals to nearest integer', () => {
    const odp: ODP = {
      nationalClasses: [
        { area: '200', forestPercent: '50' },
        { area: '1002', forestPercent: '10' },
        { area: null, forestPercent: '5' },
        { area: '400', forestPercent: null },
      ],
    }
    assert.equal(200, ODPs.calcTotalFieldArea({ odp, field: 'forestPercent' }))

    const odp2: ODP = {
      nationalClasses: [
        { area: '200', forestPercent: '50' },
        { area: '1008', forestPercent: '10' },
        { area: null, forestPercent: '5' },
        { area: '400', forestPercent: null },
      ],
    }
    assert.equal(201, ODPs.calcTotalFieldArea({ odp: odp2, field: 'forestPercent' }))
  })

  it('allows copying values only for empty odp', () => {
    const odp: ODP = { nationalClasses: [{ name: '' }] }
    assert.equal(true, ODPs.canCopyPreviousValues(odp))
  })

  it('disallows copying of values if odp has named national classes', () => {
    const odp: ODP = { nationalClasses: [{ name: 'national class 1' }] }
    assert.equal(false, ODPs.canCopyPreviousValues(odp))
  })
})
