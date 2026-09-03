import { countryIsos } from 'meta/area/countryIso'

import { DB } from 'server/db/db'

// integration test to check that db and countryIso array are exact match
export default (): void =>
  test('Expect countryIsos array to be 1:1 with public.country table', async () => {
    const dbCountryIsos = await DB.map<string>('select country_iso from public.country', [], (row) => row.country_iso)
    const countryIsoStrings: Array<string> = [...countryIsos]

    const missingFromArray = dbCountryIsos.filter((iso) => !countryIsoStrings.includes(iso))
    const missingFromDb = countryIsos.filter((iso) => !dbCountryIsos.includes(iso))

    const eitherMissing = missingFromArray.length > 0 || missingFromDb.length > 0

    if (eitherMissing) {
      const errorMessage = `countryIsos array is out of sync with public.country table:
      \t\tmissing from countryIsos array: [${missingFromArray.join(', ')}]
      \t\tmissing from public.country table: [${missingFromDb.join(', ')}]`
      throw new Error(errorMessage)
    }
  })
