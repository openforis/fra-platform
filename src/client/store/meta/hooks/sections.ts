import { useMemo } from 'react'

import { Section, SubSection } from 'meta/assessment/section'
import { SubSections } from 'meta/assessment/subSections'

import { useAppSelector } from 'client/store/hooks'
import { MetadataSelectors } from 'client/store/meta/selectors'
import { useCycleRouteParams, useSectionRouteParams } from 'client/hooks/routeParams'

export const useSections = (): Array<Section> => {
  const { assessmentName, cycleName } = useCycleRouteParams()

  return useAppSelector((state) => MetadataSelectors.getSections(state, assessmentName, cycleName))
}

export const useSection = (sectionNameParam?: string): SubSection => {
  const sections = useSections()
  const { sectionName: sectionNameRouteParam } = useSectionRouteParams()
  // Prefer optional function param if passed over url param for sectionName
  const sectionName = sectionNameParam ?? sectionNameRouteParam

  return useMemo<SubSection>(() => {
    let subSection: SubSection
    for (let i = 0; i < sections?.length; i += 1) {
      subSection = sections[i].subSections.find((subSection) => subSection.props.name === sectionName)
      if (subSection) break
    }
    return subSection
  }, [sectionName, sections])
}

export const usePreviousSection = (sectionName?: string): SubSection => {
  const sections = useSections()
  const currentSection = useSection(sectionName)

  return useMemo<SubSection>(
    () => SubSections.getPrevious({ subSection: currentSection, sections }),
    [currentSection, sections]
  )
}
