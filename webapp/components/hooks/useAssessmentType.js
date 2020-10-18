import { useParams } from 'react-router'

export const useAssessmentType = () => {
  const { assessmentType } = useParams()
  return assessmentType
}
