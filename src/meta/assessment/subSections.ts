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

const getPrevious = (props: { subSection: SubSection; sections: Array<Section> }): SubSection => {
  const { subSection, sections } = props
  const subsections = sections.reduce<Array<SubSection>>((acc, section) => [...acc, ...section.subSections], [])
  const previousSubsection = subsections.findIndex((s) => s.id === subSection.id) - 1
  return subsections[previousSubsection]
}

const getNext = (props: { subSection: SubSection; sections: Array<Section> }): SubSection => {
  const { subSection, sections } = props
  const subsections = sections.reduce<Array<SubSection>>((acc, section) => [...acc, ...section.subSections], [])
  const nextSubsection = subsections.findIndex((s) => s.id === subSection.id) + 1
  return subsections[nextSubsection]
}

export const SubSections = {
  getAnchor,
  getAnchorsByUuid,
  getPrevious,
  getNext,
}
