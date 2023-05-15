import { AssessmentName, CycleName, TableName, TableSection } from '@meta/assessment'
import { SectionName } from '@meta/assessment/section'
import { NodeUpdate } from '@meta/data'

export interface MetadataBaseState {
  nodeValueValidation?: Record<TableName, NodeUpdate>
  tableSections?: Record<SectionName, Array<TableSection>>
}

export interface MetadataState {
  [assessmentName: AssessmentName]: {
    [cycleName: CycleName]: MetadataBaseState
  }
}
