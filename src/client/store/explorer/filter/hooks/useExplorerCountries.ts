import { ExplorerFilter } from 'meta/explorer/filter'

import { ExplorerFilterSelectors } from 'client/store/explorer/filter/selectors'
import { useAppSelector } from 'client/store/store'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useExplorerCountries = (): ExplorerFilter['countries'] | undefined => {
  const { assessmentName, cycleName } = useCycleRouteParams()

  return useAppSelector((state) => ExplorerFilterSelectors.getCountries(state, assessmentName, cycleName))
}
