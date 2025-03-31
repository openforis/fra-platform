import { getOneCountry } from 'server/repository/redis/area/getOneCountry'

import { getManyCountries } from './getManyCountries'
import { getManyRegionGroups } from './getManyRegionGroups'

export const AreaRedisRepository = {
  getManyCountries,
  getManyRegionGroups,
  getOneCountry,
}
