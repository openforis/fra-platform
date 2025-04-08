import { getOneCountry } from 'server/repository/redis/area/getOneCountry'

import { getCountriesMap } from './getCountriesMap'
import { getManyCountries } from './getManyCountries'
import { getManyRegionGroups } from './getManyRegionGroups'

export const AreaRedisRepository = {
  getCountriesMap,
  getManyCountries,
  getManyRegionGroups,
  getOneCountry,
}
