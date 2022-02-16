import { useAppSelector } from '@client/store'
import { AssessmentSectionState } from '@client/store/pages/assessmentSection'

export const useAssessmentSection = (): AssessmentSectionState =>
  useAppSelector((state) => state.pages.assessmentSection)
