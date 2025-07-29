import { ExplorerSelection } from 'meta/explorer/selection'

import { ExplorerSelectionSelectors } from 'client/store/explorer/selection/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useExplorerCountries = (): ExplorerSelection['countries'] | undefined => {
  const { assessmentName, cycleName } = useCycleRouteParams()

  return useAppSelector((state) => ExplorerSelectionSelectors.getCountries(state, assessmentName, cycleName))
}
