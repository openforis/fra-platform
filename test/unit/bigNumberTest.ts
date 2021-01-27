// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const { assert } = require('chai')
const BigNumberUtils = require('../../common/bignumberUtils')

const array = [2, 4, 7, 8]

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('BigNumber', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('sum', () => {
    const res = BigNumberUtils.sum(array)
    assert.equal(res, 21)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('add', () => {
    const res = BigNumberUtils.add(2, 7)
    assert.equal(res, 9)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('sub', () => {
    const res = BigNumberUtils.sub(7, 2)
    assert.equal(res, 5)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('mul', () => {
    const res = BigNumberUtils.mul(7, 2)
    assert.equal(res, 14)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('div', () => {
    const res = BigNumberUtils.div(7, 2)
    assert.equal(res, 3.5)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('abs', () => {
    const res = BigNumberUtils.abs(-7)
    assert.equal(res, 7)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('eq false', () => {
    const res = BigNumberUtils.eq(7, 2)
    assert.equal(res, false)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('eq true', () => {
    const res = BigNumberUtils.eq(7, 7)
    assert.equal(res, true)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('max', () => {
    const res = BigNumberUtils.max(...array)
    assert.equal(res, 8)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('min', () => {
    const res = BigNumberUtils.min(...array)
    assert.equal(res, 2)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('greaterThanOrEqualTo', () => {
    const res = BigNumberUtils.greaterThanOrEqualTo(7, 7)
    assert.equal(res, true)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('lessThanOrEqualTo', () => {
    const res = BigNumberUtils.lessThanOrEqualTo(4, 7)
    assert.equal(res, true)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('greaterThan', () => {
    const res = BigNumberUtils.greaterThan(7, 7)
    assert.equal(res, false)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('lessThan', () => {
    const res = BigNumberUtils.lessThan(7, 7)
    assert.equal(res, false)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('toFixed', () => {
    const res = BigNumberUtils.toFixed(9873.43734)
    assert.equal(res, 9873.44)
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('toString', () => {
    const res = BigNumberUtils.toString(9873.43234)
    assert.equal(res, '9873.43234')
  })

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('formatNumber', () => {
    const res = BigNumberUtils.formatNumber(9873.43645)
    assert.equal(res, `9${BigNumberUtils.groupSeparator}873.44`)
  })
})
