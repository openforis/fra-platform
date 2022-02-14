import { create } from './create'
import { read } from './read'
import { remove } from './remove'
import { getCountryISOs } from './getCountryISOs'
import { getSections } from './getSections'
import { createOriginalDataPoint } from './createOriginalDataPoint'
import { getOriginalDataPoint } from './getOriginalDataPoint'
import { getTableData } from './getTableData'
import { getSectionMetadata } from './getSectionMetadata'
import { getRegionGroups } from './getRegionGroups'
import { createCycle } from './createCycle'
import { getCountryStatus } from './getCountryStatus'
import { updateCountryStatus } from './updateCountryStatus'

export const AssessmentController = {
  create,
  read,
  remove,
  getRegionGroups,
  getCountryISOs,
  getSections,
  getSectionMetadata,
  createOriginalDataPoint,
  getOriginalDataPoint,
  getTableData,
  createCycle,
  getCountryStatus,
  updateCountryStatus,
}
