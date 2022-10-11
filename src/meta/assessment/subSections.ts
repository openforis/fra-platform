import { Cycle } from '@meta/assessment/cycle'
import { Section, SubSection } from '@meta/assessment/section'

const getAnchor = (props: { cycle: Cycle; subSection: SubSection }): string => {
  const { cycle, subSection } = props
  return subSection.props.anchors[cycle.uuid]
}

const getAnchorsByUuid = (props: { cycle: Cycle; sections: Array<Section> }): Record<string, string> => {
  const { cycle, sections } = props
  return sections.reduce<Record<string, string>>((acc, section) => {
    const accUpdate = { ...acc }
    section.subSections.forEach((subSection) => {
      const anchor = getAnchor({ cycle, subSection })
      if (anchor) {
        accUpdate[subSection.uuid] = anchor
      }
    })
    return accUpdate
  }, {})
}

export const SubSections = {
  getAnchor,
  getAnchorsByUuid,
}
