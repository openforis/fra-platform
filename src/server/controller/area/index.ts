import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { CountrySummaryRepository } from 'server/repository/assessmentCycle/countrySummary'
import { AreaRedisRepository } from 'server/repository/redis/area'

import { updateCountry } from './updateCountry'

export const AreaController = {
  getCountries: AreaRedisRepository.getManyCountries,
  getCountry: CountryRepository.getOne,
  getCountrySummaries: CountrySummaryRepository.getMany,
  getCountrySummariesCount: CountrySummaryRepository.getCount,
  getRegionGroups: AreaRedisRepository.getManyRegionGroups,
  refreshSummaries: CountrySummaryRepository.refreshMaterializedView,
  updateCountry,
}
