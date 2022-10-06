import { Assessment, Section, SubSection } from '../../../src/meta/assessment'
import { SectionSpec } from '../../../src/test/sectionSpec'
import { getCycleUuids } from './utils'

export const getSection = (props: { cycles: Array<string>; index: number; labelKey: string }): Section => {
  const { cycles, index, labelKey } = props
  return {
    props: {
      cycles,
      labelKey,
      index,
    },
  }
}

export const getSubSection = (props: { assessment: Assessment; spec: SectionSpec; index: number }): SubSection => {
  const { assessment, spec, index } = props

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
      labelKey: '', // TODO
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
