import { DimensionName } from 'meta/measurement/dimension'

import { ExplorerFilterSelectors } from 'client/store/explorer/filter/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

export const useExplorerDimensions = (): Array<DimensionName> | undefined => {
  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

  return useAppSelector((state) => ExplorerFilterSelectors.getDimensions(state, assessmentName, cycleName, sectionName))
}
