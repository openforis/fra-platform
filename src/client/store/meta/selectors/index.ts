import { getAssessment, getAssessments, getDefaultAssessment } from 'client/store/meta/selectors/assessment'
import { getDashboard } from 'client/store/meta/selectors/dashboard'
import { getSections } from 'client/store/meta/selectors/sections'

export const MetadataSelectors = {
  getAssessment,
  getAssessments,
  getDashboard,
  getDefaultAssessment,
  getSections,
}
