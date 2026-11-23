import { CycleUuid } from 'meta/assessment/cycle'
import { Description } from 'meta/assessment/description/description'
import { SectionName } from 'meta/assessment/section'

export type Descriptions = Record<CycleUuid, Description>

export type DescriptionVisibilityProps = {
  hasNationalDataPointData: boolean
  sectionName: SectionName
  useNationalDataPoint: boolean
}
