const assert = require('chai').assert
const acceptNextInteger = require('../../webapp/utils/numberInput').acceptNextInteger
const acceptNextDecimal = require('../../webapp/utils/numberInput').acceptNextDecimal

describe("Number input", () => {
  it("accepts an integer", () => {
    const actual = acceptNextInteger('3', '1')
    assert.equal('3', actual)
  })

  it('does not accepts integers over 20 chars', () => {
    const actual = acceptNextInteger('123456789012345678901', '1')
    assert.equal('1', actual)
  })

  it('does not accept scientific notation', () => {
    const actual = acceptNextInteger('1e3', '1')
    assert.equal('1', actual)
  })

  it('accepts decimal with two places', () => {
    const actual = acceptNextDecimal('1.03', '1.00')
    assert.equal('1.03', actual)
  })

  it('accepts decimal with no decimal part', () => {
    const actual = acceptNextDecimal('2.', '1.00')
    assert.equal('2.', actual)
  })

  it('does not accept decimal with three places', () => {
    const actual = acceptNextDecimal('1.888', '1.00')
    assert.equal('1.00', actual)
  })
})
