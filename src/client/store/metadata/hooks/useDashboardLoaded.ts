import { useSelector } from 'react-redux'

import { AssessmentName, CycleName } from 'meta/assessment'

import { RootState } from 'client/store/RootState'

import { MetadataSelectors } from '../selectors'

export const useDashboardLoaded = (assessmentName: AssessmentName, cycleName: CycleName): boolean => {
  return useSelector((state: RootState) => MetadataSelectors.getDashboardLoaded(state, assessmentName, cycleName))
}
