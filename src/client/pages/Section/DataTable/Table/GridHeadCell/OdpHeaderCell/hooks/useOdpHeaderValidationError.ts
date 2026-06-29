import { NationalDataPointValidations } from 'meta/assessment/validation/nationalDataPointValidations'

import { useOriginalDataPointReservedYears } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useNationalDataPointValidation } from 'client/store/data/tableData/validations/hooks/nationalDataPoints'

type Props = {
  odpId?: number
}

export const useOdpHeaderValidationError = (props: Props): boolean => {
  const { odpId } = props
  const reservedYears = useOriginalDataPointReservedYears() ?? []
  const uuid = reservedYears.find((reservedYear) => reservedYear.id === odpId)?.uuid
  const validation = useNationalDataPointValidation({ uuid })

  return NationalDataPointValidations.hasError(validation)
}
