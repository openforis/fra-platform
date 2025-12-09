import { ExplorerCountryOptions } from 'meta/explorer/selection'

import { ExplorerSelectionSelectors } from 'client/store/explorer/selection/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCycleRouteParams } from 'client/hooks/routeParams'

export const useExplorerCountryOptions = (): ExplorerCountryOptions => {
  const { assessmentName, cycleName } = useCycleRouteParams()

  return useAppSelector((state) => ExplorerSelectionSelectors.getCountryOptions(state, assessmentName, cycleName))
}
