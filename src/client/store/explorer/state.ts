import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { RecordAssessmentData } from 'meta/data'
import { ExplorerFilter } from 'meta/explorer/filter'
import { ExplorerMetadata } from 'meta/explorer/metadata'

export interface ExplorerDataState {
  data: RecordAssessmentData
}

export interface ExplorerMetadataState {
  metadata: Record<AssessmentName, Record<CycleName, Record<SectionName, ExplorerMetadata>>>
}

export interface ExplorerFilterState {
  filter: Record<AssessmentName, Record<CycleName, ExplorerFilter>>
}
