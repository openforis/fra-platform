import { AssessmentName, CycleName, Section, TableSection } from 'meta/assessment'
import { SectionName } from 'meta/assessment/section'
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
