import { AssessmentName } from 'meta/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Section, SectionName } from 'meta/assessment/section'
import { TableSection } from 'meta/assessment/tableSection'
import { DashboardItem } from 'meta/dashboard'

export enum DashboardAreaType {
  Region = 'region',
  Country = 'country',
}

type DashboardState = Record<
  AssessmentName,
  Record<
    CycleName,
    { [DashboardAreaType.Region]?: Array<DashboardItem>; [DashboardAreaType.Country]?: Array<DashboardItem> }
  >
>

export interface MetadataState {
  sections: Record<AssessmentName, Record<CycleName, Array<Section>>>
  tableSections: Record<AssessmentName, Record<CycleName, Record<SectionName, Array<TableSection>>>>
  dashboard: DashboardState
}

export const initialState: MetadataState = {
  sections: {},
  tableSections: {},
  dashboard: {},
}
