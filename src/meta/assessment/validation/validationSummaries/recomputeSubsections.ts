import { ValidationSummary } from 'meta/assessment/validation/summary'

type Props = {
  summary: ValidationSummary
}

export const recomputeSubsections = (props: Props): void => {
  const { summary } = props

  Object.entries(summary.subsections).forEach(([subsectionUuid, summarySubsection]) => {
    const { descriptionNames, sectionName, tableNames } = summarySubsection
    const descriptionsValid = descriptionNames?.every(
      (descriptionName) => summary.descriptions[sectionName]?.[descriptionName]?.valid ?? true
    )
    const tablesValid = tableNames.every((tableName) => summary.tables[tableName]?.valid ?? true)
    const nationalDataPointsValid = summary.nationalDataPoints[sectionName]?.valid ?? true

    summary.subsections[subsectionUuid].valid = descriptionsValid && tablesValid && nationalDataPointsValid
  })
}
