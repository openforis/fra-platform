import { SectionSpec } from '../../webapp/sectionSpec'
import { Section, SubSection } from '../../meta/assessment/section'

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
        analysisAndProcessing:
          typeof spec.descriptions.analysisAndProcessing === 'boolean'
            ? (spec.descriptions.analysisAndProcessing as boolean)
            : 'withOdp',
        comments: typeof spec.descriptions.comments === 'boolean' ? (spec.descriptions.comments as boolean) : 'withOdp',
        introductoryText:
          typeof spec.descriptions.introductoryText === 'boolean'
            ? (spec.descriptions.introductoryText as boolean)
            : 'withOdp',
        nationalData:
          typeof spec.descriptions.nationalData === 'boolean' ? (spec.descriptions.nationalData as boolean) : 'withOdp',
      },
    },
  }
  return section
}
