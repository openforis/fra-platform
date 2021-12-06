import { create } from './create'
import { read } from './read'
import { remove } from './remove'
import { getCountryISOs } from './getCountryISOs'
import { getRegionGroups } from './getRegionGroups'
import { createAssessmentCycle } from './createAssessmentCycle'

export const AssessmentController = {
  create,
  read,
  remove,
  getRegionGroups,
  getCountryISOs,
  createAssessmentCycle,
}
