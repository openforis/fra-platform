import { CommentableDescriptionName, SectionName } from 'meta/assessment'

export type DescriptionsEditEnabledState = Record<SectionName, Record<CommentableDescriptionName, boolean>>

export type AssessmentSectionState = {
  descriptionsEditEnabled: DescriptionsEditEnabledState
  estimationPending: boolean
  showOriginalDataPoint?: boolean
}

export const initialState: AssessmentSectionState = {
  descriptionsEditEnabled: {},
  showOriginalDataPoint: true,
  /**
   * @deprecated.
   * Move 'estimationPending' under data slice
   */
  estimationPending: false,
}
