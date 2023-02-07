import { Objects } from '@utils/objects'

import { Section, SectionProps, SubSection, SubSectionProps } from '@meta/assessment'

interface SectionDB {
  id: number
  uuid: string
  props: SectionProps & { cycles: Array<string> }
  sub_sections?: Array<SubSection>
}

interface SubSectionDB {
  id: number
  uuid: string
  props: SubSectionProps & { cycles: Array<string> }
}

export const SubSectionAdapter = (subSection: SubSectionDB): SubSection => {
  const { props, ...restSubSection } = subSection
  const { anchors, labels, ...restProps } = props

  return {
    ...restSubSection,
    props: {
      ...Objects.camelize(restProps),
      anchors,
      labels,
    },
  }
}

export const SectionAdapter = (section: SectionDB): Section => {
  // eslint-disable-next-line camelcase
  const { sub_sections, props, ...restSection } = section

  return {
    ...restSection,
    props,
    // eslint-disable-next-line camelcase
    subSections: sub_sections?.map(SubSectionAdapter),
  }
}
