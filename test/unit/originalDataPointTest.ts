import { assert } from 'chai'
import * as originalDataPoint from '../../webapp/app/assessment/fra/sections/originalDataPoint/originalDataPoint'

describe('originalDataPoint', () => {
  it('calculates correct total forest amount', () => {
    const odpWithNationalClasses = {
      nationalClasses: [
        { area: 200, forestPercent: 50 },
        { area: 1000, forestPercent: 10 },
        { area: null, forestPercent: 5 },
        { area: 400, forestPercent: null },
      ],
    }
    assert.equal(200.0, originalDataPoint.classTotalArea(odpWithNationalClasses, 'forestPercent'))
  })

  // Temporarily disabled, ODP code should no longer round to integer
  xit('rounds decimals to nearest integer', () => {
    const odpWithNationalClasses = {
      nationalClasses: [
        { area: 200, forestPercent: 50 },
        { area: 1002, forestPercent: 10 },
        { area: null, forestPercent: 5 },
        { area: 400, forestPercent: null },
      ],
    }
    assert.equal(200, originalDataPoint.classTotalArea(odpWithNationalClasses, 'forestPercent'))

    const odpWithNationalClasses2 = {
      nationalClasses: [
        { area: 200, forestPercent: 50 },
        { area: 1008, forestPercent: 10 },
        { area: null, forestPercent: 5 },
        { area: 400, forestPercent: null },
      ],
    }
    assert.equal(201, originalDataPoint.classTotalArea(odpWithNationalClasses2, 'forestPercent'))

    assert.equal(-1, String(originalDataPoint.classTotalArea(odpWithNationalClasses2, 'forestPercent')).indexOf('.'))
  })

  it('allows copying values only for empty odp', () => {
    assert.equal(true, originalDataPoint.allowCopyingOfPreviousValues({ naionalClasses: [{ className: '' }] }))
  })
  it('disallows copying of values if odp has named national classes', () => {
    assert.equal(
      true,
      originalDataPoint.allowCopyingOfPreviousValues({ naionalClasses: [{ className: 'national class 1' }] })
    )
  })
})
