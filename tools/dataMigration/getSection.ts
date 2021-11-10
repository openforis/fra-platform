import { SectionSpec } from '../../webapp/sectionSpec'
import { Section } from '../../core/meta/section'

export const getSection = (props: {
  assessmentId: number
  spec: SectionSpec
  cycles: Array<string>
  index: number
}): Section => {
  const { assessmentId, spec, cycles, index } = props

  const section: Section = {
    assessmentId,
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
    tableSections: [],
  }
  return section
}
