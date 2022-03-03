import { TableRepository } from '@server/repository/table'

import { create } from './create'
import { getOne, getOneWithCycle } from './getOne'
import { remove } from './remove'
import { getCountryISOs } from './getCountryISOs'
import { getSections } from './getSections'
import { createOriginalDataPoint } from './createOriginalDataPoint'
import { removeOriginalDataPoint } from './removeOriginalDataPoint'
import { updateOriginalDataPoint } from './updateOriginalDataPoint'
import { getOriginalDataPoint } from './getOriginalDataPoint'
import { getSectionMetadata } from './getSectionMetadata'
import { getRegionGroups } from './getRegionGroups'
import { createCycle } from './createCycle'
import { getCountryStatus } from './getCountryStatus'
import { updateCountryStatus } from './updateCountryStatus'
import { getReservedYears } from './getReservedYears'
import { getSection } from './getSection'

export const AssessmentController = {
  create,
  getOne,
  getOneWithCycle,
  remove,
  getRegionGroups,
  getCountryISOs,
  getSections,
  getSectionMetadata,
  createOriginalDataPoint,
  removeOriginalDataPoint,
  updateOriginalDataPoint,
  getOriginalDataPoint,
  createCycle,
  getCountryStatus,
  updateCountryStatus,
  getReservedYears,
  getSection,
  getTable: TableRepository.getOne,
}
