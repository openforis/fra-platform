import iso from 'iso-3166-1'

import { CountryIso } from 'meta/area/countryIso'

type Props = { countryIso: CountryIso }
type Returned = string | null

/**
 * Converts ISO3 country code to ISO2 format
 * @param props.countryIso - CountryIso (ISO3 format, e.g. 'FIN')
 * @returns ISO2 code (like 'FI') or null if not found
 */
export const getCountryIso2 = (props: Props): Returned => {
  const { countryIso } = props
  const country = iso.whereAlpha3(countryIso)
  return country?.alpha2 || null
}
