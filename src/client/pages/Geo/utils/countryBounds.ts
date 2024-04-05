import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { Bounds } from 'meta/geo'

type CountryBounds = { [key in CountryIso]?: Bounds }
const countryBounds: CountryBounds = {}

/**
 * Makes an API call to get the Bounds of a country.
 *
 * @param {CountryIso} countryIso The country to query the statistics data.
 * @public
 */
export const getCountryBounds = async (countryIso: CountryIso): Promise<Bounds> => {
  try {
    if (!countryBounds[countryIso]) {
      const response = await axios.get(ApiEndPoint.Geo.bounds(), { params: { countryIso } })
      countryBounds[countryIso] = response.data
    }
    return countryBounds[countryIso]
  } catch (error) {
    return null
  }
}
