import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

export type DescriptionsEditEnabledState = Record<SectionName, Record<CommentableDescriptionName, boolean>>

export type CountryReportState = {
  descriptionsEditEnabled: DescriptionsEditEnabledState
  showOriginalDataPoint?: boolean
  locked: boolean
}

export const initialState: CountryReportState = {
  descriptionsEditEnabled: {},
  showOriginalDataPoint: true,
  locked: true,
}
