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

  it('rounds decimals to nearest integer', () => {
    const odpWithNationalClasses = {
      nationalClasses: [{area: 200, forestPercent: 50},
        {area: 1002, forestPercent: 10},
        {area: null, forestPercent: 5},
        {area: 400, forestPercent: null}]
    }
    assert.equal(200, originalDataPoint.totalForest(odpWithNationalClasses, 'forestPercent'))

    const odpWithNationalClasses2 = {
      nationalClasses: [{area: 200, forestPercent: 50},
        {area: 1008, forestPercent: 10},
        {area: null, forestPercent: 5},
        {area: 400, forestPercent: null}]
    }
    assert.equal(201, originalDataPoint.totalForest(odpWithNationalClasses2, 'forestPercent'))

    assert.equal(-1, String(originalDataPoint.totalForest(odpWithNationalClasses2, 'forestPercent')).indexOf('.'))
  })
})
