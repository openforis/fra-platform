import { useSelector } from 'react-redux'

import { AssessmentName, CycleName } from 'meta/assessment'

import { RootState } from 'client/store/RootState'

import { MetadataSelectors } from '../selectors'

export const useDashboardLoading = (assessmentName: AssessmentName, cycleName: CycleName): boolean => {
  return useSelector((state: RootState) => MetadataSelectors.getDashboardLoading(state, assessmentName, cycleName))
}
