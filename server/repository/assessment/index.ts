import { createAssessmentSchema } from './createAssessmentSchema'
import { createAssessment } from './createAssessment'
import { read } from './read'
import { readSections } from './readSections'
import { readTableData } from './readTableData'
import { getManyRows } from './getManyRows'
import { getManyCols } from './getManyCols'
import { getSectionMetaData } from './getSectionMetaData'
import { readOdp } from './readOdp'
import { removeAssessmentSchema } from './removeAssessmentSchema'
import { removeAssessment } from './removeAssessment'
import { getCountryISOs } from './getCountryISOs'
import { getRegionGroups } from './getRegionGroups'
import { createCycle } from './createCycle'
import { getCountryStatus } from './getCountryStatus'
import { updateCountryStatus } from './updateCountryStatus'

export const AssessmentRepository = {
  createAssessment,
  createAssessmentSchema,
  read,
  readSections,
  getSectionMetaData,
  getManyRows,
  getManyCols,
  readTableData,
  readOdp,
  removeAssessmentSchema,
  removeAssessment,
  getCountryISOs,
  getRegionGroups,
  createCycle,
  getCountryStatus,
  updateCountryStatus,
}
