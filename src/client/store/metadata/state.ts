import { AssessmentName, CycleName, Section, TableSection } from 'meta/assessment'
import { SectionName } from 'meta/assessment/section'
import { DashboardItem } from 'meta/dashboard'

export interface MetadataState {
  sections: Record<AssessmentName, Record<CycleName, Array<Section>>>
  tableSections: Record<AssessmentName, Record<CycleName, Record<SectionName, Array<TableSection>>>>
  dashboard: Record<AssessmentName, Record<CycleName, Array<DashboardItem>>>
}

export const initialState: MetadataState = {
  sections: {},
  tableSections: {},
  dashboard: {},
}
