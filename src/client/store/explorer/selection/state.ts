import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { AxisSelection, AxisType, ExplorerSelection } from 'meta/explorer/selection'

export type ExplorerSelectionState = Record<AssessmentName, Record<CycleName, ExplorerSelection>>

export const defaultAxisSelection: AxisSelection = {
  x: [AxisType.measures, AxisType.dimensions],
  y: [AxisType.countries],
}
