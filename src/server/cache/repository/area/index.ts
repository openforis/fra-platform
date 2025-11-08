import { getCountriesMap } from 'server/cache/repository/area/getCountriesMap'
import { getManyCountries } from 'server/cache/repository/area/getManyCountries'
import { getManyRegionGroups } from 'server/cache/repository/area/getManyRegionGroups'
import { getOneCountry } from 'server/cache/repository/area/getOneCountry'
import { removeAreas } from 'server/cache/repository/area/removeAreas'

export const AreaRedisRepository = {
  getCountriesMap,
  getManyCountries,
  getManyRegionGroups,
  getOneCountry,
  removeAreas,
}
