import { getOneCountry } from 'server/repository/redis/area/getOneCountry'
import { removeAreas } from 'server/repository/redis/area/removeAreas'

import { getCountriesMap } from './getCountriesMap'
import { getManyCountries } from './getManyCountries'
import { getManyRegionGroups } from './getManyRegionGroups'

export const AreaRedisRepository = {
  getCountriesMap,
  getManyCountries,
  getManyRegionGroups,
  getOneCountry,
  removeAreas,
}
