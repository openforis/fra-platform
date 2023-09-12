import { AssessmentName, CycleName, Section, TableSection } from 'meta/assessment'
import { SectionName } from 'meta/assessment/section'

export interface MetadataState {
  sections: Record<AssessmentName, Record<CycleName, Array<Section>>>
  tableSections: Record<AssessmentName, Record<CycleName, Record<SectionName, Array<TableSection>>>>
}

export const initialState: MetadataState = {
  sections: {},
  tableSections: {},
}
