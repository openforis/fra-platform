import { CountryIso } from 'meta/area'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

export type DescriptionsEditEnabledState = Record<SectionName, Record<CommentableDescriptionName, boolean>>

export type CountryReportState = {
  descriptionsEditEnabled: DescriptionsEditEnabledState
  globalCountries?: Array<CountryIso>
  locked: boolean
  showOriginalDataPoint?: boolean
}

export const initialState: CountryReportState = {
  descriptionsEditEnabled: {},
  locked: true,
  showOriginalDataPoint: true,
}
