import { Assessment, AssessmentName } from 'meta/assessment/assessment'
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

export interface MetaState {
  assessments: Array<Assessment>
  dashboard: DashboardState
  sections: Record<AssessmentName, Record<CycleName, Array<Section>>>
  tableSections: Record<AssessmentName, Record<CycleName, Record<SectionName, Array<TableSection>>>>
}

export const initialState: MetaState = {
  assessments: [],
  dashboard: {},
  sections: {},
  tableSections: {},
}
