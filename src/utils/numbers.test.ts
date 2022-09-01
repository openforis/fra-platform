import { BigNumberInput, Numbers } from './numbers'

const array: BigNumberInput[] = [2, 4, 7, 8]

const t = Numbers.toBigNumber

describe('Numbers test:', () => {
  test('sum', () => {
    const res = Numbers.sum(array)
    expect(res).toEqual(t(21))
  })

  test('add', () => {
    const res = Numbers.add(2, 7)
    expect(res).toEqual(t(9))
  })

  test('sub', () => {
    const res = Numbers.sub(7, 2)
    expect(res).toEqual(t(5))
  })

  test('mul', () => {
    const res = Numbers.mul(7, 2)
    expect(res).toEqual(t(14))
  })

  test('div', () => {
    const res = Numbers.div(7, 2)
    expect(res).toEqual(t(3.5))
  })

  test('abs', () => {
    const res = Numbers.abs(-7)
    expect(res).toEqual(t(7))
  })

  test('eq false', () => {
    const res = Numbers.eq(7, 2)
    expect(res).toEqual(false)
  })

  test('eq true', () => {
    const res = Numbers.eq(7, 7)
    expect(res).toEqual(true)
  })

  test('max', () => {
    const res = Numbers.max(...array)
    expect(res).toEqual(t(8))
  })

  test('min', () => {
    const res = Numbers.min(...array)
    expect(res).toEqual(t(2))
  })

  test('greaterThanOrEqualTo', () => {
    const res = Numbers.greaterThanOrEqualTo(7, 7)
    expect(res).toEqual(true)
  })

  test('lessThanOrEqualTo', () => {
    const res = Numbers.lessThanOrEqualTo(4, 7)
    expect(res).toEqual(true)
  })

  test('greaterThan', () => {
    const res = Numbers.greaterThan(7, 7)
    expect(res).toEqual(false)
  })

  test('lessThan', () => {
    const res = Numbers.lessThan(7, 7)
    expect(res).toEqual(false)
  })

  test('toFixed', () => {
    const res = Numbers.toFixed(9873.43734)
    expect(res).toEqual('9873.44')
  })

  test('toString', () => {
    const res = Numbers.toString(9873.43234)
    expect(res).toEqual('9873.43234')
  })

  test('format', () => {
    const res = Numbers.format(9873.43645)
    expect(res).toEqual(`9${Numbers.groupSeparator}873.44`)
  })
})
