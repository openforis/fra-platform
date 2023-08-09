import { useParams } from 'react-router-dom'

import { Section, SubSection } from 'meta/assessment'

import { useAppSelector } from 'client/store'

export const useAssessmentSections = (): Array<Section> => useAppSelector((state) => state.assessment.sections)
export const useAssessmentSection = (sectionNameParam?: string): SubSection => {
  const sections = useAssessmentSections()
  const { sectionName: s } = useParams<{ sectionName: string }>()
  // Prefer optional function param if passed over url param for sectionName
  const sectionName = sectionNameParam ?? s
  return sections
    ?.find((section) => section.subSections.find((subSection) => subSection.props.name === sectionName))
    .subSections.find((subSection) => subSection.props.name === sectionName)
}

export const useIsAppInitialized = () => useAppSelector((state) => state.assessment.appInitialized)
