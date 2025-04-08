import { Country } from 'meta/area'

import { BaseProtocol, DB } from 'server/db'

import { getCountriesMap } from './getCountriesMap'
import { Props } from './props'

export const getManyCountries = async (props: Props, client: BaseProtocol = DB): Promise<Array<Country>> => {
  const countriesMap = await getCountriesMap(props, client)
  return Object.values(countriesMap)
}
