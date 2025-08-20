import * as ccl from 'country-codes-list'
import iso from 'iso-3166-1'

import { CountryIso } from 'meta/area/countryIso'

type Props = { callingCode: string }
type Returned = CountryIso | null

// Some countries might have several matches, return the relevant one
// E.g. otherwise: Expected: "FIN" Received: "ALA"
const priorityCountries = ['US', 'FI', 'GB', 'FR', 'DE']

/**
 * Converts telephone calling code to ISO3 country code
 * @param props.callingCode - calling code string (e.g. '358' or '+358')
 * @returns ISO3 country code (like 'FIN') or null if not found
 */
export const getCountryIsoFromCallingCode = (props: Props): Returned => {
  const { callingCode } = props

  try {
    const cleanCode = callingCode.replace(/^\+/, '')

    const countries = ccl.filter('countryCallingCode', cleanCode)
    if (countries.length === 0) return null
    const country = countries.find((c) => priorityCountries.includes(c.countryCode)) || countries.at(0)

    const countryInfo = iso.whereAlpha2(country.countryCode)
    return (countryInfo?.alpha3 as CountryIso) || null
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Could not find country for calling code '${callingCode}':`, error)
    return null
  }
}
