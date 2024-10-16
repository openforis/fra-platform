import { Objects } from 'utils/objects'

import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'
import { Sections } from 'meta/assessment/sections'

import { Assessment } from './assessment'

const cloneProps = (props: { cycleSource: Cycle; cycleTarget: Cycle; subSection: SubSection }): SubSection['props'] => {
  const { cycleSource, cycleTarget, subSection } = props

  const { uuid: cycleSourceUuid } = cycleSource
  const { uuid: cycleTargetUuid } = cycleTarget
  const section = subSection as Section

  const _props: SubSection['props'] = Sections.cloneProps({ cycleSource, cycleTarget, section }) as SubSection['props']

  const descriptionsSource = Objects.cloneDeep(_props.descriptions?.[cycleSourceUuid])
  if (!Objects.isEmpty(descriptionsSource)) {
    // unset nationalData->dataSources->text needed only in FRA 2025
    Objects.unset(descriptionsSource, ['nationalData', 'dataSources', 'text'])
    _props.descriptions[cycleTargetUuid] = descriptionsSource
  }
  if (_props.hidden?.[cycleSourceUuid])
    _props.hidden[cycleTargetUuid] = Objects.cloneDeep(_props.hidden[cycleSourceUuid])
  if (_props.hints?.[cycleSourceUuid]) _props.hints[cycleTargetUuid] = Objects.cloneDeep(_props.hints[cycleSourceUuid])

  return _props
}

const getAnchor = (props: { cycle: Cycle; subSection: SubSection }): string => {
  const { cycle, subSection } = props
  return subSection.props.anchors[cycle.uuid]
}

const getAnchorLabel = (props: { assessment: Assessment; cycle: Cycle; subSection: SubSection }): string =>
  `anchors.${props.assessment.props.name}.${props.cycle.name}.${getAnchor(props)}`

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
  cloneProps,
  getAnchor,
  getAnchorLabel,
  getAnchorsByUuid,
  getPrevious,
}
