import { create } from './create'
import { read } from './read'
import { remove } from './remove'
import { getCountryISOs } from './getCountryISOs'
import { getSections } from './getSections'
import { getTables } from './getTables'
import { getTablesMetadata } from './getTablesMetadata'
import { getOdp } from './getOdp'
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
  getTablesMetadata,
  getTables,
  getOdp,
  createCycle,
  getCountryStatus,
  updateCountryStatus,
}
