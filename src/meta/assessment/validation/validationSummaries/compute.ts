import { SectionName } from 'meta/assessment/section'
import { RecordDescriptionValidations } from 'meta/assessment/validation/description'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'
import { ValidationSummary } from 'meta/assessment/validation/summary'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'
import { recomputeSections } from 'meta/assessment/validation/validationSummaries/recomputeSections'
import { recomputeSubsections } from 'meta/assessment/validation/validationSummaries/recomputeSubsections'
import { updateDescriptions } from 'meta/assessment/validation/validationSummaries/updateDescriptions'
import { updateNationalDataPoints } from 'meta/assessment/validation/validationSummaries/updateNationalDataPoints'
import { updateTables } from 'meta/assessment/validation/validationSummaries/updateTables'
import { Objects } from 'utils/objects'

export type ComputeProps = {
  descriptionSectionNames?: Array<SectionName>
  descriptionValidations?: RecordDescriptionValidations
  nationalDataPointValidations?: RecordNDPValidations
  summary: ValidationSummary
  tableValidations?: RecordTableValidationsState
}

export const compute = (props: ComputeProps): ValidationSummary => {
  const { descriptionSectionNames, descriptionValidations, nationalDataPointValidations, tableValidations } = props

  const summary = Objects.cloneDeep(props.summary)

  if (!Objects.isNil(tableValidations)) {
    updateTables({ summary, tableValidations })
  }

  if (!Objects.isNil(descriptionValidations)) {
    const summarySectionNames = Object.values(summary.subsections).map(({ sectionName }) => sectionName)
    const sectionNames = descriptionSectionNames ?? summarySectionNames

    updateDescriptions({ descriptionValidations, sectionNames, summary })
  }

  if (!Objects.isNil(nationalDataPointValidations)) {
    updateNationalDataPoints({ nationalDataPointValidations, summary })
  }

  recomputeSubsections({ summary })
  recomputeSections({ summary })

  return summary
}
