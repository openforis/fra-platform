import { useAppSelector } from 'client/store'

import { AssessmentFilesState } from '../stateType'

export const useAssessmentFiles = (): AssessmentFilesState => useAppSelector((state) => state.ui.assessmentFiles)
