import { Objects } from 'utils/objects'

import { Section, SectionProps, SubSection, SubSectionProps } from 'meta/assessment/section'
import { UUID } from 'meta/uuid'

interface SectionDB {
  id: number
  uuid: string
  props: SectionProps & { cycles: Array<string> }
  sub_sections?: Array<SubSection>
}

interface SubSectionDB {
  id: number
  uuid: string
  parent_uuid?: UUID
  props: SubSectionProps & { cycles: Array<string> }
}

export const SubSectionAdapter = (subSection: SubSectionDB): SubSection => {
  // eslint-disable-next-line camelcase
  const { parent_uuid, props, ...restSubSection } = subSection
  const { anchors, descriptions, hidden, hints, labels, ...restProps } = props

  return {
    ...restSubSection,
    // eslint-disable-next-line camelcase
    parentUuid: parent_uuid,
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
  const { props, sub_sections, ...restSection } = section

  return {
    ...restSection,
    props,
    // eslint-disable-next-line camelcase
    subSections: sub_sections?.map(SubSectionAdapter),
  }
}
