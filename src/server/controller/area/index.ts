import { AssessmentFileRepository } from '@server/repository/assessment/file'
import { CountryRepository } from '@server/repository/assessmentCycle/country'
import { RegionRepository } from '@server/repository/assessmentCycle/region'

import { updateCountry } from './updateCountry'

export const AreaController = {
  getCountries: CountryRepository.getMany,
  getCountry: CountryRepository.getOne,
  getFile: AssessmentFileRepository.getOne,
  getFiles: AssessmentFileRepository.getMany,
  getRegionGroups: RegionRepository.getRegionGroups,
  updateCountry,
}
