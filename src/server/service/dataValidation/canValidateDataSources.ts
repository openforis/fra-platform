import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { CycleNames } from 'meta/assessment/cycle/names'
import { CommentableDescription, CommentableDescriptionName } from 'meta/assessment/descriptionValue'

type Props = {
  assessment: Assessment
  cycle: Cycle
  description: Omit<CommentableDescription, 'id'>
}

export const canValidateDataSources = (props: Props): boolean => {
  const { assessment, cycle, description } = props
  const { name, value } = description
  const isLegacyFra2020 = assessment.props.name === AssessmentNames.fra && cycle.name === CycleNames._2020

  // FRA 2020 data sources are text descriptions, so skip it.
  // Only FRA is excluded: pan-European 2020 does have data source tables.
  return !isLegacyFra2020 && name === CommentableDescriptionName.dataSources && value.dataSources !== undefined
}
