import { CountrySummaryRepository } from 'server/repository/assessmentCycle/countrySummary'
import { AreaRedisRepository } from 'server/repository/redis/area'

import { updateCountry } from './updateCountry'
import { updateCountryStatus } from './updateCountryStatus'

export const AreaController = {
  getCountries: AreaRedisRepository.getManyCountries,
  getCountry: AreaRedisRepository.getOneCountry,
  getCountrySummaries: CountrySummaryRepository.getMany,
  getCountrySummariesCount: CountrySummaryRepository.getCount,
  getRegionGroups: AreaRedisRepository.getManyRegionGroups,
  refreshSummaries: CountrySummaryRepository.refreshMaterializedView,
  updateCountry,
  updateCountryStatus,
}
