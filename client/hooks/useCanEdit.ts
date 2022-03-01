import { useUser } from '@client/store/user'
import { Authorizer } from '@meta/user'
import { useCountryIso } from '@webapp/hooks'
import { useAssessmentCountryStatus, useCurrentAssessmentSubSection } from '@client/store/assessment/hooks'

export const canEdit = () => {
  const user = useUser()
  const section = useCurrentAssessmentSubSection()
  const countryIso = useCountryIso()
  const countryStatus = useAssessmentCountryStatus()

  return Authorizer.canEdit({
    section,
    user,
    countryIso,
    countryStatus,
  })
}
