import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'

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

const getPrevious = (props: { subSection: SubSection; sections: Array<Section> }): SubSection => {
  const { subSection, sections } = props
  const sectionIsFirstOfParent = subSection.props.index === 0
  const parentIndex = sections.findIndex((s) => s.id === subSection.parentId)
  if (sectionIsFirstOfParent) {
    return sections[parentIndex - 1]?.subSections?.[sections[parentIndex - 1].subSections.length - 1]
  }
  const ssIndex = sections[parentIndex].subSections.findIndex((ss) => ss.id === subSection.id)
  return sections[parentIndex].subSections[ssIndex - 1]
}

export const SubSections = {
  getAnchor,
  getAnchorsByUuid,
  getPrevious,
}
