import { useTranslation } from 'react-i18next'

import { ODPs } from 'meta/assessment/odps'
import { NationalClassValidation } from 'meta/assessment/odps/validateODP'
import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'
import { Authorizer } from 'meta/user'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSection } from 'client/store/meta/hooks/sections'
import { useUser } from 'client/store/user/hooks/user'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'

type Props = {
  originalDataPoint: OriginalDataPoint
  index: number
  variable: keyof NationalClassValidation
}
export const useNationalClassValidations = (props: Props) => {
  const { index, originalDataPoint, variable } = props
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

  const nationalClassValidation = ODPs.validateNationalClass(originalDataPoint, index)

  if (nationalClassValidation[variable]) {
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
