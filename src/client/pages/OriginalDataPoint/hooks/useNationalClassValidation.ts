import { useTranslation } from 'react-i18next'

import { ODPs } from 'meta/assessment'

import { useOriginalDataPoint } from 'client/store/ui/originalDataPoint'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'

export const useNationalClassValidation = (props: { mustBeEqualTo?: boolean; index: number }) => {
  const { index, mustBeEqualTo = false } = props
  const originalDataPoint = useOriginalDataPoint()

  const { nationalClasses } = originalDataPoint

  const nationalClassValidations = nationalClasses.map((_, index) =>
    ODPs.validateNationalClass(originalDataPoint, index)
  )

  const { print } = useIsPrintRoute()

  const hasErrors = nationalClassValidations[index].error

  const { t } = useTranslation()

  if (!hasErrors || print) {
    return null
  }

  return t(`generalValidation.${mustBeEqualTo ? 'classValuesMustBeEqualTo' : 'classValueNotGreaterThan'}`, {
    name: nationalClasses[index].name,
    value: '100%',
  })
}
