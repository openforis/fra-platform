import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { User, Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  invitationUuid: string
  callback: () => void
  user: User
}

export const useRemoveInvitation = (props: Props) => {
  const { invitationUuid, callback, user } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const assessmentName = assessment.props.name
  const cycle = useCycle()
  const cycleName = cycle.name
  const { countryIso } = useCountryRouteParams()

  return useCallback(() => {
    if (window.confirm(t('userManagement.confirmDelete', { user: Users.getFullName(user) })))
      dispatch(
        UserManagementActions.removeInvitation({
          assessmentName,
          cycleName,
          countryIso: countryIso as CountryIso,
          invitationUuid,
        })
      ).then(callback)
  }, [t, user, dispatch, assessmentName, cycleName, countryIso, invitationUuid, callback])
}
