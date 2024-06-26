import { Objects } from 'utils/objects'

import { Section, SectionProps, SubSection, SubSectionProps } from 'meta/assessment'

interface SectionDB {
  id: number
  uuid: string
  props: SectionProps & { cycles: Array<string> }
  sub_sections?: Array<SubSection>
}

interface SubSectionDB {
  id: number
  uuid: string
  parent_id?: number
  props: SubSectionProps & { cycles: Array<string> }
}

export const SubSectionAdapter = (subSection: SubSectionDB): SubSection => {
  // eslint-disable-next-line camelcase
  const { parent_id, props, ...restSubSection } = subSection
  const { anchors, descriptions, hidden, hints, labels, ...restProps } = props

  return {
    ...restSubSection,
    // eslint-disable-next-line camelcase
    parentId: parent_id,
    props: {
      ...Objects.camelize(restProps),
      anchors,
      descriptions,
      hidden,
      hints,
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
