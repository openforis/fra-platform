import { MeasureName } from 'meta/measurement/measure'
import { UnitName } from 'meta/measurement/unitName'

import { ExplorerSelectionSelectors } from 'client/store/explorer/selection/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'

export const useExplorerUnits = (): Record<MeasureName, UnitName> | undefined => {
  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

  return useAppSelector((state) => ExplorerSelectionSelectors.getUnits(state, assessmentName, cycleName, sectionName))
}
