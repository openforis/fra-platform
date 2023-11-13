import { useAppSelector } from 'client/store/store'
import { AssessmentFilesState } from 'client/store/ui/assessmentFiles/stateType'

export const useAssessmentFiles = (): AssessmentFilesState => useAppSelector((state) => state.ui.assessmentFiles)
