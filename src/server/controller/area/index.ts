import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { CountrySummaryRepository } from 'server/repository/assessmentCycle/countrySummary'
import { RegionRepository } from 'server/repository/assessmentCycle/region'

import { updateCountry } from './updateCountry'

export const AreaController = {
  getCountries: CountryRepository.getMany,
  getCountry: CountryRepository.getOne,
  getCountrySummaries: CountrySummaryRepository.getMany,
  getCountrySummariesCount: CountrySummaryRepository.getCount,
  getRegionGroups: RegionRepository.getRegionGroups,
  refreshSummaries: CountrySummaryRepository.refreshMaterializedView,
  updateCountry,
}
