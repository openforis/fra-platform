import { Areas } from './areas'

describe('Areas', () => {
  describe('isISOCountry', () => {
    test.each(['ITA', 'FIN', 'X01', 'X20'])('returns true for a valid country iso "%s"', (isoCode) => {
      expect(Areas.isISOCountry(isoCode)).toBe(true)
    })

    test.each([
      'AAA', // not a real country code
      'CAM', // subregion code
      'EU', // region code
      'WO', // global code
      'ita', // lowercase
      'ITAL', // too long
      '',
    ])('returns false for "%s"', (isoCode) => {
      expect(Areas.isISOCountry(isoCode)).toBe(false)
    })
  })

  describe('isAreaCode', () => {
    test.each([
      'ITA', // country
      'FIN', // country
      'X01', // atlantis
      'WO', // global
      'EU', // region
    ])('returns true for a valid area code "%s"', (isoCode) => {
      expect(Areas.isAreaCode(isoCode)).toBe(true)
    })

    test.each([
      'AAA', // not a real area code
      'CAM', // subregion code, not a region code
      'ita', // lowercase
      '',
    ])('returns false for "%s"', (isoCode) => {
      expect(Areas.isAreaCode(isoCode)).toBe(false)
    })
  })
})
