import { Cycle } from '@meta/assessment/cycle'
import { Section } from '@meta/assessment/section'

const getAnchorsByUuid = (props: { cycle: Cycle; sections: Array<Section> }): Record<string, string> => {
  const { cycle, sections } = props
  return sections.reduce<Record<string, string>>((acc, section) => {
    const accUpdate = { ...acc }
    section.subSections.forEach((subSection) => {
      const anchor = subSection.props.anchors[cycle.uuid]
      if (anchor) {
        accUpdate[subSection.uuid] = anchor
      }
    })
    return accUpdate
  }, {})
}

export const SubSections = {
  getAnchorsByUuid,
}
