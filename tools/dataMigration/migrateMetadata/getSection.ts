import { Section, SubSection } from '../../../meta/assessment/section'
import { SectionSpec } from '../../../webapp/sectionSpec'

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

export const getSubSection = (props: { spec: SectionSpec; cycles: Array<string>; index: number }): SubSection => {
  const { spec, cycles, index } = props

  const section: SubSection = {
    props: {
      anchor: spec.sectionAnchor,
      name: spec.sectionName,
      cycles,
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
