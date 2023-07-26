import { AssessmentName, CycleName, TableSection } from 'meta/assessment'
import { SectionName } from 'meta/assessment/section'

export interface MetadataState {
  tableSections: Record<AssessmentName, Record<CycleName, Record<SectionName, Array<TableSection>>>>
}

export const initialState: MetadataState = {
  tableSections: {},
}
