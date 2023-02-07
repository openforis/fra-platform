import { Assessment } from '../../../src/meta/assessment/assessment'
import { Section, SubSection } from '../../../src/meta/assessment/section'
import { SectionSpec } from '../../../src/test/sectionSpec'
import { getCycleUuids, getLabels } from './utils'

export const getSection = (props: { assessment: Assessment; index: number; labelKey: string }): Section => {
  const { assessment, index, labelKey } = props
  const cycleUuids = getCycleUuids({ assessment })
  return {
    props: {
      anchors: cycleUuids.reduce((acc, cycleUuid) => ({ ...acc, [cycleUuid]: String(index) }), {}),
      cycles: cycleUuids,
      labels: getLabels({ assessment, label: { key: labelKey } }),
      index,
    },
  }
}

export const getSubSection = (props: { assessment: Assessment; spec: SectionSpec; index: number }): SubSection => {
  const { assessment, spec, index } = props
  const isPanEuropean = assessment.props.name === 'panEuropean'

  const anchors = assessment.cycles.reduce<Record<string, string>>((acc, cycle) => {
    const accUpdate = { ...acc }
    if (spec.migration?.anchors) {
      const anchor = spec.migration.anchors[cycle.name]
      if (anchor) {
        accUpdate[cycle.uuid] = anchor
      }
    } else {
      accUpdate[cycle.uuid] = spec.sectionAnchor
    }
    return accUpdate
  }, {})

  const section: SubSection = {
    props: {
      anchors,
      name: spec.sectionName,
      cycles: getCycleUuids({ assessment, migration: spec.migration }),
      index,
      labels: getLabels({
        assessment,
        label: { key: `${isPanEuropean ? 'panEuropean.' : ''}${spec.sectionName}.${spec.sectionName}` },
        migration: spec.migration,
      }),
      showTitle: spec.showTitle,
      descriptions: {
        analysisAndProcessing: Boolean(spec.descriptions.analysisAndProcessing),
        comments: Boolean(spec.descriptions.comments),
        introductoryText: Boolean(spec.descriptions.introductoryText),
        nationalData: Boolean(spec.descriptions.nationalData),
      },
    },
  }
  if (spec.dataExport?.included) {
    section.props.dataExport = spec.dataExport.included
  }
  return section
}
