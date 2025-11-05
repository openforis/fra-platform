import { Country } from 'meta/area/country'

import { getCountriesMap } from 'server/cache/repository/area/getCountriesMap'
import { Props } from 'server/cache/repository/area/props'
import { BaseProtocol, DB } from 'server/db/db'

export const getManyCountries = async (props: Props, client: BaseProtocol = DB): Promise<Array<Country>> => {
  const countriesMap = await getCountriesMap(props, client)
  return Object.values(countriesMap)
}
