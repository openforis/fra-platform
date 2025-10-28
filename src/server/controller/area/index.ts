import { CountrySummaryRepository } from 'server/db/repository/assessmentCycle/countrySummary'
import { AreaRedisRepository } from 'server/cache/repository/area'

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
