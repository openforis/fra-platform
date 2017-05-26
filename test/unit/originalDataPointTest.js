const assert = require('chai').assert
const originalDataPoint = require('../../webapp/originalDataPoint/originalDataPoint')

describe('originalDataPoint', () => {
  it('calculates correct total forest amount', () => {
    const odpWithNationalClasses = {
      nationalClasses: [{area: 200, forestPercent: 50},
        {area: 1000, forestPercent: 10},
        {area: null, forestPercent: 5},
        {area: 400, forestPercent: null}]
    }
    assert.equal(200.00, originalDataPoint.totalForest(odpWithNationalClasses, 'forestPercent'))
  })

  it('fails', () => {
    assert.fail(true, false, "testing failure")
  })
})
