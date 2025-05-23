import { MeasureName } from 'meta/measurement/measure'

import { ExplorerFilterSelectors } from 'client/store/explorer/filter/selectors'
import { useAppSelector } from 'client/store/store'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

export const useExplorerMeasures = (): Array<MeasureName> | undefined => {
  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()

  return useAppSelector((state) => ExplorerFilterSelectors.getMeasures(state, assessmentName, cycleName, sectionName))
}
