import { create } from './create'
import { read } from './read'
import { remove } from './remove'
import { createAssessmentCycle } from './createAssessmentCycle'
import { getAssessmentCycles } from './getAssessmentCycles'
import { getCountries } from './getCountries'
import { getRegions } from './getRegions'
import { getRegionGroups } from './getRegionGroups'

export const AssessmentController = {
  create,
  read,
  remove,
  createAssessmentCycle,
  getAssessmentCycles,
  getRegionGroups,
  getRegions,
  getCountries,
}
