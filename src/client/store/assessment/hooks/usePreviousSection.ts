import { SubSection, SubSections } from 'meta/assessment'

import { useAssessmentSection, useAssessmentSections } from 'client/store/assessment'

export const usePreviousSection = (sectionName?: string): SubSection => {
  const sections = useAssessmentSections()
  const currentSection = useAssessmentSection(sectionName)
  return SubSections.getPrevious({ subSection: currentSection, sections })
}
