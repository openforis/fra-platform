import { UUID } from 'meta/uuid/uuid'

import { useNationalDataPointValidation } from 'client/store/data/tableData/validations/hooks/nationalDataPoints'

import { ErrorTooltip, useErrorTooltip } from './useErrorTooltip'

type Props = {
  nationalDataPointUuid?: UUID
}

export const useYearErrorTooltip = (props: Props): ErrorTooltip | undefined => {
  const { nationalDataPointUuid } = props
  const nationalDataPointValidation = useNationalDataPointValidation({ uuid: nationalDataPointUuid })

  return useErrorTooltip({ validation: nationalDataPointValidation.year })
}
