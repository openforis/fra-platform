import { RegionGroup } from 'meta/area'

import { AreaSelectors } from 'client/store/area/selectors'
import { useAppSelector } from 'client/store/store'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useRegionGroups = (): Record<string, RegionGroup> => {
  const { assessmentName, cycleName } = useCycleRouteParams()

  return useAppSelector((state) => AreaSelectors.getRegionGroups(state, assessmentName, cycleName))
}
