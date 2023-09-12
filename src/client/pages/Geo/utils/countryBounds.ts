import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { Bounds } from 'meta/geo'
/**
 * Makes an API call to get the Bounds of a country.
 *
 * @param {CountryIso} countryIso The country to query the statistics data.
 * @public
 */
export const getCountryBounds = async (countryIso: CountryIso): Promise<Bounds> => {
  try {
    const response = await axios.get(ApiEndPoint.Geo.bounds(), { params: { countryIso } })
    return response.data
  } catch (error) {
    return null
  }
}
