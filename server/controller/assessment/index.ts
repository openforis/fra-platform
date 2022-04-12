import { AssessmentRepository } from '@server/repository/assessment'
import { CountryRepository } from '@server/repository/country'
import { TableRepository } from '@server/repository/table'

import { create } from './create'
import { getOne, getOneWithCycle } from './getOne'
import { remove } from './remove'
import { getSections } from './getSections'
import { createOriginalDataPoint } from './createOriginalDataPoint'
import { removeOriginalDataPoint } from './removeOriginalDataPoint'
import { updateOriginalDataPoint } from './updateOriginalDataPoint'
import { getOriginalDataPoint } from './getOriginalDataPoint'
import { getSectionMetadata } from './getSectionMetadata'
import { getRegionGroups } from './getRegionGroups'
import { createCycle } from './createCycle'
import { getReservedYears } from './getReservedYears'
import { getSection } from './getSection'
import { updateCountry } from './updateCountry'

export const AssessmentController = {
  create,
  getOne,
  getOneWithCycle,
  remove,
  getRegionGroups,
  getCountries: CountryRepository.getMany,
  getSections,
  getSectionMetadata,
  createOriginalDataPoint,
  removeOriginalDataPoint,
  updateOriginalDataPoint,
  getOriginalDataPoint,
  createCycle,
  updateCountry,
  getCountry: AssessmentRepository.getCountry,
  getReservedYears,
  getSection,
  getTable: TableRepository.getOne,
}
