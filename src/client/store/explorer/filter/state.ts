import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { ExplorerFilter } from 'meta/explorer/filter'

export type ExplorerFilterState = Record<AssessmentName, Record<CycleName, Record<SectionName, ExplorerFilter>>>
