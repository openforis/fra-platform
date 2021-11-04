import { assert } from 'chai'
import * as BigNumberUtils from '@core/utils/numbers'

const array: BigNumberUtils.BigNumberInput[] = [2, 4, 7, 8]

describe('BigNumber', () => {
  it('sum', () => {
    const res = BigNumberUtils.sum(array)
    // @ts-ignore
    assert.equal(res, 21)
  })

  it('add', () => {
    const res = BigNumberUtils.add(2, 7)
    // @ts-ignore
    assert.equal(res, 9)
  })

  it('sub', () => {
    const res = BigNumberUtils.sub(7, 2)
    // @ts-ignore
    assert.equal(res, 5)
  })

  it('mul', () => {
    const res = BigNumberUtils.mul(7, 2)
    // @ts-ignore
    assert.equal(res, 14)
  })

  it('div', () => {
    const res = BigNumberUtils.div(7, 2)
    // @ts-ignore
    assert.equal(res, 3.5)
  })

  it('abs', () => {
    const res = BigNumberUtils.abs(-7)
    // @ts-ignore
    assert.equal(res, 7)
  })

  it('eq false', () => {
    const res = BigNumberUtils.eq(7, 2)
    // @ts-ignore
    assert.equal(res, false)
  })

  it('eq true', () => {
    const res = BigNumberUtils.eq(7, 7)
    // @ts-ignore
    assert.equal(res, true)
  })

  it('max', () => {
    const res = BigNumberUtils.max(...array)
    // @ts-ignore
    assert.equal(res, 8)
  })

  it('min', () => {
    const res = BigNumberUtils.min(...array)
    // @ts-ignore
    assert.equal(res, 2)
  })

  it('greaterThanOrEqualTo', () => {
    const res = BigNumberUtils.greaterThanOrEqualTo(7, 7)
    // @ts-ignore
    assert.equal(res, true)
  })

  it('lessThanOrEqualTo', () => {
    const res = BigNumberUtils.lessThanOrEqualTo(4, 7)
    // @ts-ignore
    assert.equal(res, true)
  })

  it('greaterThan', () => {
    const res = BigNumberUtils.greaterThan(7, 7)
    // @ts-ignore
    assert.equal(res, false)
  })

  it('lessThan', () => {
    const res = BigNumberUtils.lessThan(7, 7)
    // @ts-ignore
    assert.equal(res, false)
  })

  it('toFixed', () => {
    const res = BigNumberUtils.toFixed(9873.43734)
    // @ts-ignore
    assert.equal(res, '9873.44')
  })

  it('toString', () => {
    const res = BigNumberUtils.toString(9873.43234)
    // @ts-ignore
    assert.equal(res, '9873.43234')
  })

  it('formatNumber', () => {
    const res = BigNumberUtils.formatNumber(9873.43645)
    // @ts-ignore
    assert.equal(res, `9${BigNumberUtils.groupSeparator}873.44`)
  })
})
