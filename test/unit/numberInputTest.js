const assert = require('chai').assert
const R = require('ramda')
const acceptNextInteger = require('../../webapp/utils/numberInput').acceptNextInteger

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
})
