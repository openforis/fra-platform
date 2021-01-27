// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const { assert } = require('chai')
const originalDataPoint = require('../../webapp/app/assessment/fra/sections/originalDataPoint/originalDataPoint')

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('originalDataPoint', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'xit'.
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('allows copying values only for empty odp', () => {
    assert.equal(true, originalDataPoint.allowCopyingOfPreviousValues({ naionalClasses: [{ className: '' }] }))
  })
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('disallows copying of values if odp has named national classes', () => {
    assert.equal(
      true,
      originalDataPoint.allowCopyingOfPreviousValues({ naionalClasses: [{ className: 'national class 1' }] })
    )
  })
})
