import { ExplorerOrderBy } from 'meta/explorer/selection'

import { ExplorerSelectionSelectors } from 'client/store/explorer/selection/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'

export const useExplorerOrderBy = (): ExplorerOrderBy | null => {
  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

  return useAppSelector((state) => ExplorerSelectionSelectors.getOrderBy(state, assessmentName, cycleName, sectionName))
}
