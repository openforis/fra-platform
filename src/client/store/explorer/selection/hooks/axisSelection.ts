import { AxisSelection } from 'meta/explorer/selection'

import { ExplorerSelectionSelectors } from 'client/store/explorer/selection/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

export const useExplorerAxisSelection = (): AxisSelection => {
  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

  return useAppSelector((state) =>
    ExplorerSelectionSelectors.getAxisSelection(state, assessmentName, cycleName, sectionName)
  )
}
