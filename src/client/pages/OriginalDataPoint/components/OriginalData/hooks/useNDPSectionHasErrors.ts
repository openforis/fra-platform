import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { SectionName } from 'meta/assessment/section'
import { hasSectionError } from 'meta/assessment/validation/nationalDataPointValidations/hasSectionError'

import { useNationalDataPointValidation } from 'client/store/data/validations/nationalDataPoints/hooks/nationalDataPoints'
import { useShowNDPValidationErrors } from 'client/pages/OriginalDataPoint/components/hooks/useShowNDPValidationErrors'

type Props = {
  originalDataPoint: OriginalDataPoint
  sectionName: SectionName
}

export const useNDPSectionHasErrors = (props: Props): boolean => {
  const { originalDataPoint, sectionName } = props

  const showNDPValidationErrors = useShowNDPValidationErrors()
  const nationalDataPointValidation = useNationalDataPointValidation({ uuid: originalDataPoint.uuid })

  return showNDPValidationErrors && hasSectionError({ nationalDataPointValidation, sectionName })
}
