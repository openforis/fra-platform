import { useTranslation } from 'react-i18next'

import { ODPs, OriginalDataPoint } from 'meta/assessment'
import { NationalClassValidation } from 'meta/assessment/originalDataPoint/odps/validateODP'

import { useUser } from 'client/store/user'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'

type Props = {
  originalDataPoint: OriginalDataPoint
  index: number
  variable: keyof NationalClassValidation
}
export const useNationalClassValidations = (props: Props) => {
  const { originalDataPoint, variable, index } = props
  const { nationalClasses } = props.originalDataPoint
  const nationalClassValidations = nationalClasses.map((_, index) =>
    ODPs.validateNationalClass(originalDataPoint, index)
  )

  const user = useUser()
  const { print } = useIsPrintRoute()

  const hasErrors = nationalClassValidations.some((v) => !v[variable])

  const { t } = useTranslation()

  const nationalClassValidation = nationalClassValidations[index]

  // don't show errors if user is not logged in or if it is print view
  if (!hasErrors || !user || print || nationalClassValidation[variable]) {
    return null
  }

  return t(
    `generalValidation.${
      variable === 'validForestCharacteristicsPercentage' ? 'classValuesMustBeEqualTo' : 'classValueNotGreaterThan'
    }`,
    {
      name: nationalClasses[index].name,
      value: '100%',
    }
  )
}
