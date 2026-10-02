import { BigNumberInput, Numbers } from './numbers'

const array: Array<BigNumberInput> = [2, 4, 7, 8]

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

  test('toBigNumber grouped string', () => {
    const res = Numbers.toBigNumber(`1${Numbers.groupSeparator}234.50`)
    expect(res).toEqual(t('1234.5'))
  })

  test('toBigNumber null value', () => {
    const res = Numbers.toBigNumber(null)
    expect(res.isNaN()).toEqual(true)
  })

  test('toBigNumber undefined value', () => {
    const res = Numbers.toBigNumber(undefined)
    expect(res.isNaN()).toEqual(true)
  })

  test('toBigNumber invalid string', () => {
    const res = Numbers.toBigNumber('not-a-number')
    expect(res.isNaN()).toEqual(true)
  })

  test('toNumberOrNull valid value', () => {
    const res = Numbers.toNumberOrNull(' 1 234.50 ')
    expect(res).toEqual(1234.5)
  })

  test('toNumberOrNull empty value', () => {
    const res = Numbers.toNumberOrNull('   ')
    expect(res).toEqual(null)
  })

  test('toNumberOrNull overflow value', () => {
    const res = Numbers.toNumberOrNull('1e309')
    expect(res).toEqual(null)
  })

  test('randomInt stays within bounds and is an integer', () => {
    Array.from({ length: 1000 }).forEach(() => {
      const res = Numbers.randomInt(3, 7)
      expect(res).toBeGreaterThanOrEqual(3)
      expect(res).toBeLessThanOrEqual(7)
      expect(Number.isInteger(res)).toEqual(true)
    })
  })

  test('randomInt with min equal to max', () => {
    const res = Numbers.randomInt(5, 5)
    expect(res).toEqual(5)
  })
})
