import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

export type DescriptionsEditEnabledState = Record<SectionName, Record<CommentableDescriptionName, boolean>>

export type AssessmentSectionState = {
  descriptionsEditEnabled: DescriptionsEditEnabledState
  showOriginalDataPoint?: boolean
}

export const initialState: AssessmentSectionState = {
  descriptionsEditEnabled: {},
  showOriginalDataPoint: true,
}
