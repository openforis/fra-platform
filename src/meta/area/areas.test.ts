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
})
