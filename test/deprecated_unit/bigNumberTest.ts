import { assert } from 'chai'
import { Numbers, BigNumberInput } from '@core/utils/numbers'

const array: BigNumberInput[] = [2, 4, 7, 8]

describe('BigNumber', () => {
  it('sum', () => {
    const res = Numbers.sum(array)
    // @ts-ignore
    assert.equal(res, 21)
  })

  it('add', () => {
    const res = Numbers.add(2, 7)
    // @ts-ignore
    assert.equal(res, 9)
  })

  it('sub', () => {
    const res = Numbers.sub(7, 2)
    // @ts-ignore
    assert.equal(res, 5)
  })

  it('mul', () => {
    const res = Numbers.mul(7, 2)
    // @ts-ignore
    assert.equal(res, 14)
  })

  it('div', () => {
    const res = Numbers.div(7, 2)
    // @ts-ignore
    assert.equal(res, 3.5)
  })

  it('abs', () => {
    const res = Numbers.abs(-7)
    // @ts-ignore
    assert.equal(res, 7)
  })

  it('eq false', () => {
    const res = Numbers.eq(7, 2)
    // @ts-ignore
    assert.equal(res, false)
  })

  it('eq true', () => {
    const res = Numbers.eq(7, 7)
    // @ts-ignore
    assert.equal(res, true)
  })

  it('max', () => {
    const res = Numbers.max(...array)
    // @ts-ignore
    assert.equal(res, 8)
  })

  it('min', () => {
    const res = Numbers.min(...array)
    // @ts-ignore
    assert.equal(res, 2)
  })

  it('greaterThanOrEqualTo', () => {
    const res = Numbers.greaterThanOrEqualTo(7, 7)
    // @ts-ignore
    assert.equal(res, true)
  })

  it('lessThanOrEqualTo', () => {
    const res = Numbers.lessThanOrEqualTo(4, 7)
    // @ts-ignore
    assert.equal(res, true)
  })

  it('greaterThan', () => {
    const res = Numbers.greaterThan(7, 7)
    // @ts-ignore
    assert.equal(res, false)
  })

  it('lessThan', () => {
    const res = Numbers.lessThan(7, 7)
    // @ts-ignore
    assert.equal(res, false)
  })

  it('toFixed', () => {
    const res = Numbers.toFixed(9873.43734)
    // @ts-ignore
    assert.equal(res, '9873.44')
  })

  it('toString', () => {
    const res = Numbers.toString(9873.43234)
    // @ts-ignore
    assert.equal(res, '9873.43234')
  })

  it('format', () => {
    const res = Numbers.format(9873.43645)
    // @ts-ignore
    assert.equal(res, `9${Numbers.groupSeparator}873.44`)
  })
})
