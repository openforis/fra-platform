import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { RegionRepository } from 'server/repository/assessmentCycle/region'

import { updateCountry } from './updateCountry'

export const AreaController = {
  getCountries: CountryRepository.getMany,
  getCountry: CountryRepository.getOne,
  getCountrySummaries: CountryRepository.getManySummaries,
  getCountrySummariesCount: CountryRepository.getCountSummaries,
  getRegionGroups: RegionRepository.getRegionGroups,
  updateCountry,
}
