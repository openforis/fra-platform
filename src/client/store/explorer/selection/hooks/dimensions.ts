import { DimensionName } from 'meta/measurement/dimension'

import { ExplorerSelectionSelectors } from 'client/store/explorer/selection/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

export const useExplorerDimensions = (): Array<DimensionName> | undefined => {
  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

  return useAppSelector((state) =>
    ExplorerSelectionSelectors.getDimensions(state, assessmentName, cycleName, sectionName)
  )
}
