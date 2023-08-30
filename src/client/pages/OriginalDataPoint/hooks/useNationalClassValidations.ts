import { useTranslation } from 'react-i18next'

import { ODPs, OriginalDataPoint } from 'meta/assessment'
import { NationalClassValidation } from 'meta/assessment/originalDataPoint/odps/validateODP'
import { Authorizer } from 'meta/user'

import { useAssessmentCountry } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import { useSection } from 'client/store/metadata'
import { useUser } from 'client/store/user'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'

type Props = {
  originalDataPoint: OriginalDataPoint
  index: number
  variable: keyof NationalClassValidation
}
export const useNationalClassValidations = (props: Props) => {
  const { originalDataPoint, variable, index } = props
  const country = useAssessmentCountry()
  const cycle = useCycle()
  const section = useSection()

  const user = useUser()
  const { print } = useIsPrintRoute()

  const { t } = useTranslation()

  const canEditData = Authorizer.canEditData({ country, cycle, section, user })

  // don't show errors if user is not logged in or if it is print view
  if (print || !canEditData) {
    return null
  }

  const nationalClassValidations = originalDataPoint.nationalClasses.map((_, index) =>
    ODPs.validateNationalClass(originalDataPoint, index)
  )
  const nationalClassValidation = nationalClassValidations[index]
  const hasErrors = nationalClassValidations.some((v) => !v[variable])

  if (!hasErrors || nationalClassValidation[variable]) {
    return null
  }

  return t(
    `generalValidation.${
      variable === 'validForestCharacteristicsPercentage' ? 'classValuesMustBeEqualTo' : 'classValueNotGreaterThan'
    }`,
    {
      name: originalDataPoint.nationalClasses[index].name,
      value: '100%',
    }
  )
}
