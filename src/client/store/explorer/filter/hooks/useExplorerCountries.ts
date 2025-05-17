import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { ExplorerFilter } from 'meta/explorer/filter'

import { ExplorerFilterSelectors } from 'client/store/explorer/filter/selectors'
import { useAppSelector } from 'client/store/store'

export const useExplorerCountries = (
  assessmentName: AssessmentName,
  cycleName: CycleName
): ExplorerFilter['countries'] | undefined => {
  return useAppSelector((state) => ExplorerFilterSelectors.getCountries(state, assessmentName, cycleName))
}
