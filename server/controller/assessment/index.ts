import { create } from './create'
import { read } from './read'
import { remove } from './remove'
import { getCountryISOs } from './getCountryISOs'
import { getSections } from './getSections'
import { createOriginalDataPoint } from './createOriginalDataPoint'
import { removeOriginalDataPoint } from './removeOriginalDataPoint'
import { updateOriginalDataPoint } from './updateOriginalDataPoint'
import { getOriginalDataPoint } from './getOriginalDataPoint'
import { getTableData } from './getTableData'
import { getTablesMetadata } from './getTablesMetadata'
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
  createOriginalDataPoint,
  removeOriginalDataPoint,
  updateOriginalDataPoint,
  getOriginalDataPoint,
  getTablesMetadata,
  getTableData,
  createCycle,
  getCountryStatus,
  updateCountryStatus,
}
