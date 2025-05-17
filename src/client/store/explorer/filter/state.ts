import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { ExplorerFilter } from 'meta/explorer/filter'

export type ExplorerFilterState = Record<AssessmentName, Record<CycleName, ExplorerFilter>>
