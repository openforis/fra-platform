import { CountryIso } from 'meta/area'
import { NodeValuesEstimation } from 'meta/assessment/nodeValuesEstimation'

import { EstimationsSelectors } from 'client/store/data/tableData/estimations/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = { estimationUuid: NodeValuesEstimation['uuid'] }

export const useNodeValuesEstimation = (props: Props): NodeValuesEstimation | undefined => {
  const { estimationUuid } = props
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  const estimations = useAppSelector((state) =>
    EstimationsSelectors.getEstimations(state, assessmentName, cycleName, countryIso)
  )

  return estimations[estimationUuid]
}
