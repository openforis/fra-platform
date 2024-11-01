import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { UserInvitationSummary } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { useRefetchInvitations } from '../../hooks/useRefetchInvitations'

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
  const refetchInvitations = useRefetchInvitations()

  return useCallback(() => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t('userManagement.confirmDelete', { user }))) {
      const params = { assessmentName, cycleName, countryIso, invitationUuid }
      dispatch(UserManagementActions.removeInvitation(params)).then(() => {
        refetchInvitations()
        callback()
      })
    }
  }, [t, user, assessmentName, cycleName, countryIso, invitationUuid, dispatch, refetchInvitations, callback])
}
