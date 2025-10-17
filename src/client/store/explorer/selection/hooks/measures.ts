import { MeasureName } from 'meta/measurement/measure'

import { ExplorerSelectionSelectors } from 'client/store/explorer/selection/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/routeParams'

export const useExplorerMeasures = (): Array<MeasureName> | undefined => {
  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

  return useAppSelector((state) =>
    ExplorerSelectionSelectors.getMeasures(state, assessmentName, cycleName, sectionName)
  )
}
