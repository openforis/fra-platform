import { Sanitizer } from './sanitizer'

describe('Sanitizer tests:', () => {
  it('accepts an integer', () => {
    const res = Sanitizer.acceptNextInteger({ value: '3', valuePrev: '1' })
    expect(res).toEqual('3')
  })

  it('does not accepts integers over 20 chars', () => {
    const res = Sanitizer.acceptNextInteger({ value: '123456789012345678901', valuePrev: '1' })
    expect(res).toEqual('1')
  })

  it('does not accept scientific notation', () => {
    const res = Sanitizer.acceptNextInteger({ value: '1e3', valuePrev: '1' })
    expect(res).toEqual('1')
  })

  it('accepts decimal with two places', () => {
    const res = Sanitizer.acceptNextDecimal({ value: '1.03', valuePrev: '1.00' })
    expect(res).toEqual('1.03')
  })

  it('accepts decimal with no decimal part', () => {
    const res = Sanitizer.acceptNextDecimal({ value: '2.', valuePrev: '1.00' })
    expect(res).toEqual('2.00')
  })

  it('rounds to 2 decimals numbers with more than 2', () => {
    const res = Sanitizer.acceptNextDecimal({ value: '1.888', valuePrev: '1.00' })
    expect(res).toEqual('1.89')
  })
})
