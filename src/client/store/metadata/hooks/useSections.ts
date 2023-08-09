import { useMemo } from 'react'

import { Section, SubSection, SubSections } from 'meta/assessment'

import { MetadataSelectors } from 'client/store/metadata/selectors'
import { useAppSelector } from 'client/store/store'
import { useCycleRouteParams, useSectionRouteParams } from 'client/hooks/useRouteParams'

export const useSections = (): Array<Section> => {
  const { assessmentName, cycleName } = useCycleRouteParams()

  return useAppSelector((state) => MetadataSelectors.getSections(state, assessmentName, cycleName))
}

export const useSection = (sectionNameParam?: string): SubSection => {
  const sections = useSections()
  const { sectionName: sectionNameRouteParam } = useSectionRouteParams()
  // Prefer optional function param if passed over url param for sectionName
  const sectionName = sectionNameParam ?? sectionNameRouteParam

  return useMemo<SubSection>(
    () =>
      sections
        ?.find((section) => section.subSections.find((subSection) => subSection.props.name === sectionName))
        .subSections.find((subSection) => subSection.props.name === sectionName),
    [sectionName, sections]
  )
}

export const usePreviousSection = (sectionName?: string): SubSection => {
  const sections = useSections()
  const currentSection = useSection(sectionName)

  return useMemo<SubSection>(
    () => SubSections.getPrevious({ subSection: currentSection, sections }),
    [currentSection, sections]
  )
}
