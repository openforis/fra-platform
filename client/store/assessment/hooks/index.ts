import { useAppSelector } from '@client/store'

export const useAssessmentLoaded = () => useAppSelector((state) => !!state.assessment)
