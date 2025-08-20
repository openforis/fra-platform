import { CountryIso } from 'meta/area/countryIso'

import { getCountryIso2 } from './getCountryIso2'

describe('getCountryIso2', () => {
  test('converts valid ISO3 to ISO2', () => {
    expect(getCountryIso2({ countryIso: 'FIN' as CountryIso })).toBe('FI')
    expect(getCountryIso2({ countryIso: 'USA' as CountryIso })).toBe('US')
    expect(getCountryIso2({ countryIso: 'GBR' as CountryIso })).toBe('GB')
  })

  test('returns null for invalid ISO3 codes', () => {
    expect(getCountryIso2({ countryIso: 'XXX' as CountryIso })).toBe(null)
    expect(getCountryIso2({ countryIso: 'INVALID' as CountryIso })).toBe(null)
    expect(getCountryIso2({ countryIso: '' as CountryIso })).toBe(null)
  })
})
