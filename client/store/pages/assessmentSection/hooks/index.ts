import { useAppSelector } from '@client/store'

export const useAssessmentSection = () => useAppSelector((state) => state.pages.assessmentSection)
