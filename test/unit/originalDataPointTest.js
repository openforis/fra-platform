const assert = require('chai').assert
const originalDataPoint = require('../../webapp/originalDataPoint/originalDataPoint')

describe('originalDataPoint', () => {
  it('calculates correct total forest amount', () => {
    assert.equal(100.00, originalDataPoint.totalForest({nationalClasses: [{area: 200, forestPercent: 50}]}, 'forestPercent'))
  })
})
