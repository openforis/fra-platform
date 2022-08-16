import { AssessmentRepository } from '@server/repository/assessment/assessment'
import { TableRepository } from '@server/repository/assessment/table'
import { CountryRepository } from '@server/repository/assessmentCycle/country'
import { OriginalDataPointRepository } from '@server/repository/assessmentCycle/originalDataPoint'

import { create } from './create'
import { createCycle } from './createCycle'
import { createOriginalDataPoint } from './createOriginalDataPoint'
import { getOne, getOneWithCycle } from './getOne'
import { getOriginalDataPoint } from './getOriginalDataPoint'
import { getRegionGroups } from './getRegionGroups'
import { getReservedYears } from './getReservedYears'
import { getSection } from './getSection'
import { getSections } from './getSections'
import { remove } from './remove'
import { removeOriginalDataPoint } from './removeOriginalDataPoint'
import { updateCountry } from './updateCountry'
import { updateOriginalDataPoint } from './updateOriginalDataPoint'

export const AssessmentController = {
  create,
  getOne,
  getOneWithCycle,
  remove,
  getRegionGroups,
  getCountries: CountryRepository.getMany,
  getSections,
  getSectionMetadata: AssessmentRepository.getSectionMetaData,
  createOriginalDataPoint,
  removeOriginalDataPoint,
  updateOriginalDataPoint,
  getOriginalDataPoint,
  getOriginalDataPoints: OriginalDataPointRepository.getMany,
  createCycle,
  updateCountry,
  getCountry: AssessmentRepository.getCountry,
  getReservedYears,
  getSection,
  getTable: TableRepository.getOne,
}
