import { getCountryIsoFromCallingCode } from './getCountryIsoFromCallingCode'

describe('getCountryIsoFromCallingCode', () => {
  test('converts valid calling codes to ISO3', () => {
    expect(getCountryIsoFromCallingCode({ callingCode: '358' })).toBe('FIN')
    expect(getCountryIsoFromCallingCode({ callingCode: '+358' })).toBe('FIN')
    expect(getCountryIsoFromCallingCode({ callingCode: '1' })).toBe('USA')
  })

  test('returns null for invalid calling codes', () => {
    expect(getCountryIsoFromCallingCode({ callingCode: '999999' })).toBe(null)
    expect(getCountryIsoFromCallingCode({ callingCode: 'invalid' })).toBe(null)
    expect(getCountryIsoFromCallingCode({ callingCode: '' })).toBe(null)
    expect(getCountryIsoFromCallingCode({ callingCode: '+' })).toBe(null)
  })
})
