import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { UserInvitationSummary } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  invitationSummary: UserInvitationSummary
  callback: () => void
}

export const useRemoveInvitation = (props: Props) => {
  const { invitationSummary, callback } = props
  const { uuid: invitationUuid, name: user } = invitationSummary
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  return useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t('userManagement.confirmDelete', { user }))) {
      const params = { assessmentName, cycleName, countryIso, invitationUuid }
      dispatch(UserManagementActions.removeInvitation(params)).then(callback)
    }
  }, [t, invitationUuid, user, dispatch, assessmentName, cycleName, countryIso, callback])
}
