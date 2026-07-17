import { NDPNationalClassValidationField } from 'meta/assessment/validation/nationalDataPoint'
import { UUID } from 'meta/uuid/uuid'

import { useNationalClassValidation } from 'client/store/data/validations/nationalDataPoints/hooks/nationalDataPoints'

import { ErrorTooltip, useErrorTooltip } from './useErrorTooltip'

type Props = {
  field: NDPNationalClassValidationField
  nationalClassUuid?: UUID
  nationalDataPointUuid?: UUID
}

export const useNationalClassErrorTooltip = (props: Props): ErrorTooltip | undefined => {
  const { field, nationalClassUuid, nationalDataPointUuid } = props
  const nationalClassValidation = useNationalClassValidation({ nationalClassUuid, nationalDataPointUuid })

  return useErrorTooltip({ validation: nationalClassValidation[field] })
}
