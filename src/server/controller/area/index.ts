import { CountrySummaryRepository } from 'server/repository/assessmentCycle/countrySummary'
import { AreaRedisRepository } from 'server/repository/redis/area'

import { updateCountry } from './updateCountry'

export const AreaController = {
  getCountries: AreaRedisRepository.getManyCountries,
  getCountriesMap: AreaRedisRepository.getCountriesMap,
  getCountry: AreaRedisRepository.getOneCountry,
  getCountrySummaries: CountrySummaryRepository.getMany,
  getCountrySummariesCount: CountrySummaryRepository.getCount,
  getRegionGroups: AreaRedisRepository.getManyRegionGroups,
  updateCountry,
}
