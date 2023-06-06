import { AssessmentName, CycleName, TableSection } from 'meta/assessment'
import { SectionName } from 'meta/assessment/section'

export interface MetadataBaseState {
  tableSections?: Record<SectionName, Array<TableSection>>
}

export interface MetadataState {
  [assessmentName: AssessmentName]: {
    [cycleName: CycleName]: MetadataBaseState
  }
}
