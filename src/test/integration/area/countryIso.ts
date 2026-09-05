import { countryISOs } from 'meta/area/countryIso'

import { DB } from 'server/db/db'

// integration test to check that db and countryIso array are exact match
export default (): void =>
  test('Expect countryISOs array to be 1:1 with public.country table', async () => {
    const dbCountryISOs = await DB.map<string>('select country_iso from public.country', [], (row) => row.country_iso)
    const countryISOStrings: Array<string> = [...countryISOs]

    const missingFromArray = dbCountryISOs.filter((iso) => !countryISOStrings.includes(iso))
    const missingFromDb = countryISOs.filter((iso) => !dbCountryISOs.includes(iso))

    const eitherMissing = missingFromArray.length > 0 || missingFromDb.length > 0

    if (eitherMissing) {
      const errorMessage = `countryISOs array is out of sync with public.country table:
      \t\tmissing from countryISOs array: [${missingFromArray.join(', ')}]
      \t\tmissing from public.country table: [${missingFromDb.join(', ')}]`
      throw new Error(errorMessage)
    }
  })
