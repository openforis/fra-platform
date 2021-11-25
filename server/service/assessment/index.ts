import { create } from './create'
import { read } from './read'
import { remove } from './remove'
import { getCountries } from './getCountries'
import { getRegions } from './getRegions'
import { getRegionGroups } from './getRegionGroups'

export const AssessmentService = {
  create,
  read,
  remove,
  getRegionGroups,
  getRegions,
  getCountries,
}
