import { create } from './create'
import { read } from './read'
import { remove } from './remove'
import { getCountryISOs } from './getCountryISOs'
import { getSections } from './getSections'
import { getOdp } from './getOdp'
import { getRegionGroups } from './getRegionGroups'
import { createCycle } from './createCycle'

export const AssessmentController = {
  create,
  read,
  remove,
  getRegionGroups,
  getCountryISOs,
  getSections,
  getOdp,
  createCycle,
}
