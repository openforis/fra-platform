import { AssessmentNames } from 'meta/assessment'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useIsFra2020 = () => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  return assessmentName === AssessmentNames.fra && cycleName === '2020'
}
