import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { CountryUserSummary } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useAppDispatch } from 'client/store'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { useRefetchUsers } from '../../hooks/useRefetchUsers'

type Props = {
  countryUserSummary: CountryUserSummary
  callback: () => void
}

export const useRemoveInvitation = (props: Props) => {
  const { countryUserSummary, callback } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const refetchInvitations = useRefetchUsers()

  return useCallback(() => {
    const { fullName: user } = countryUserSummary
    const { invitation } = CountryUserSummaries.getCountryRoleAndInvitation(countryUserSummary, countryIso)
    const { uuid: invitationUuid } = invitation
    // eslint-disable-next-line no-alert
    if (window.confirm(t('userManagement.confirmDelete', { user }))) {
      const params = { assessmentName, cycleName, countryIso, invitationUuid }
      dispatch(UserManagementActions.removeInvitation(params)).then(() => {
        refetchInvitations()
        callback()
      })
    }
  }, [countryUserSummary, countryIso, t, assessmentName, cycleName, dispatch, refetchInvitations, callback])
}
