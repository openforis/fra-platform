// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const { assert } = require('chai')

const { acceptNextInteger, acceptNextDecimal } = require('../../webapp/utils/numberInput')

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Number input', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('accepts an integer', () => {
    const actual = acceptNextInteger('3', '1')
    assert.equal('3', actual)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('does not accepts integers over 20 chars', () => {
    const actual = acceptNextInteger('123456789012345678901', '1')
    assert.equal('1', actual)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('does not accept scientific notation', () => {
    const actual = acceptNextInteger('1e3', '1')
    assert.equal('1', actual)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('accepts decimal with two places', () => {
    const actual = acceptNextDecimal('1.03', '1.00')
    assert.equal('1.03', actual)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('accepts decimal with no decimal part', () => {
    const actual = acceptNextDecimal('2.', '1.00')
    assert.equal('2.00', actual)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('rounds to 2 decimals numbers with more than 2', () => {
    const actual = acceptNextDecimal('1.888', '1.00')
    assert.equal('1.89', actual)
  })
})
