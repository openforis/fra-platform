import { AssessmentName, CycleName, Section, TableSection } from 'meta/assessment'
import { SectionName } from 'meta/assessment/section'
import { DashboardItem } from 'meta/dashboard'

type DashboardState = Record<
  AssessmentName,
  Record<CycleName, { region: Array<DashboardItem>; country: Array<DashboardItem> }>
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
