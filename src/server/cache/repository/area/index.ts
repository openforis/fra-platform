import { getCountriesMap } from 'server/cache/repository/area/getCountriesMap'
import { getCountriesRecord } from 'server/cache/repository/area/getCountriesRecord'
import { getManyCountries } from 'server/cache/repository/area/getManyCountries'
import { getManyRegionGroups } from 'server/cache/repository/area/getManyRegionGroups'
import { getOneCountry } from 'server/cache/repository/area/getOneCountry'
import { removeAreas } from 'server/cache/repository/area/removeAreas'

export const AreaRedisRepository = {
  getCountriesMap,
  getCountriesRecord,
  getManyCountries,
  getManyRegionGroups,
  getOneCountry,
  removeAreas,
}
