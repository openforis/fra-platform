import { Descriptions } from 'meta/assessment/descriptions'
import { SectionName } from 'meta/assessment/section'
import { TableName } from 'meta/assessment/table'
import { ValidationSummary, ValidationSummarySubsection } from 'meta/assessment/validation/summary'

type Props = {
  hasNationalDataPointData: boolean
  sectionName: SectionName
  summary: ValidationSummary
  tableNames: Array<TableName>
  useNationalDataPoint: boolean
}

export const calculateSubsection = (props: Props): ValidationSummarySubsection => {
  const { hasNationalDataPointData, sectionName, summary, tableNames, useNationalDataPoint } = props

  // Only visible descriptions count for the summary
  const descriptionNames = Descriptions.getVisibleDescriptionNames({
    hasNationalDataPointData,
    sectionName,
    useNationalDataPoint,
  })

  const descriptionsValid = descriptionNames.every(
    (descriptionName) => summary.descriptions[sectionName]?.[descriptionName]?.valid ?? true
  )
  const tablesValid = tableNames.every((tableName) => summary.tables[tableName]?.valid ?? true)
  const nationalDataPointsValid = summary.nationalDataPoints[sectionName]?.valid ?? true
  const valid = descriptionsValid && tablesValid && nationalDataPointsValid

  return { descriptionNames, sectionName, tableNames, valid }
}
