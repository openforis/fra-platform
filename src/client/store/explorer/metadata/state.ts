import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { ExplorerMetadata } from 'meta/explorer/metadata'

export type ExplorerMetadataState = Record<AssessmentName, Record<CycleName, Record<SectionName, ExplorerMetadata>>>
