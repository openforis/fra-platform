import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useAppDispatch } from 'client/store'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import type { Props as BaseProps } from '../../../Props'
import { useRefetchUsers } from '../../hooks/useRefetchUsers'

type Props = BaseProps & {
  callback: () => void
}

export const useRemoveInvitation = (props: Props) => {
  const { user, callback } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const refetchInvitations = useRefetchUsers()

  return useCallback(() => {
    const { fullName } = user
    const { invitation } = CountryUserSummaries.getCountryRoleAndInvitation(user, countryIso)
    const { uuid: invitationUuid } = invitation
    // eslint-disable-next-line no-alert
    if (window.confirm(t('userManagement.confirmDelete', { user: fullName }))) {
      const params = { assessmentName, cycleName, countryIso, invitationUuid }
      dispatch(UserManagementActions.removeInvitation(params)).then(() => {
        refetchInvitations()
        callback()
      })
    }
  }, [user, countryIso, t, assessmentName, cycleName, dispatch, refetchInvitations, callback])
}
