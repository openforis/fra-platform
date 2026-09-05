import { ValidationSummary } from 'meta/assessment/validation/summary'

type Props = {
  summary: ValidationSummary
}

export const recomputeSections = (props: Props): void => {
  const { summary } = props

  Object.keys(summary.sections).forEach((sectionUuid) => {
    const { subsections } = summary.sections[sectionUuid]
    const subsectionUuids = Object.keys(subsections)

    summary.sections[sectionUuid].valid = subsectionUuids.every((subsectionUuid) => {
      const subsectionValid = summary.subsections[subsectionUuid]?.valid ?? true

      subsections[subsectionUuid].valid = subsectionValid

      return subsectionValid
    })
  })
}
