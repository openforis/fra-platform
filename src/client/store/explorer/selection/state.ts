import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { ExplorerSelection } from 'meta/explorer/selection'

export type ExplorerSelectionState = Record<AssessmentName, Record<CycleName, ExplorerSelection>>
