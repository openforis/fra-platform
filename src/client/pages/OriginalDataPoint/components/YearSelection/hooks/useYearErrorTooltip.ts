import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Validation } from 'meta/assessment/validation/validation'

import { useNationalDataPointValidation } from 'client/store/data/tableData/validations/hooks/nationalDataPoints'
import { ErrorTooltip, useErrorTooltip } from 'client/pages/OriginalDataPoint/hooks/useErrorTooltip'

type Props = {
  nationalDataPoint: OriginalDataPoint
}

// Draft NDPs use year -1 and do not exist in the backend yet, so backend validations cannot cover this draft case.
const draftYearValidation: Validation = { valid: false, messages: [{ key: 'generalValidation.notEmpty' }] }

export const useYearErrorTooltip = (props: Props): ErrorTooltip | undefined => {
  const { nationalDataPoint } = props
  const { uuid, year } = nationalDataPoint
  const nationalDataPointValidation = useNationalDataPointValidation({ uuid })
  const validation = year === -1 ? draftYearValidation : nationalDataPointValidation.year

  return useErrorTooltip({ validation })
}
