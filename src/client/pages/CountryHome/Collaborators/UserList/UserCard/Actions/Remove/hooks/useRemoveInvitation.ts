import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCountryRouteParams } from 'client/hooks/routeParams'

import type { Props as BaseProps } from '../../../Props'
import { useRefetchUsers } from '../../hooks/useRefetchUsers'

type Props = BaseProps & {
  callback: () => void
}

type Returned = () => Promise<void>

export const useRemoveInvitation = (props: Props): Returned => {
  const { callback, user } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()
  const refetchInvitations = useRefetchUsers()

  return useCallback(async () => {
    const { fullName } = user
    const { invitation } = CountryUserSummaries.getCountryRoleAndInvitation(user, countryIso)
    const { uuid: invitationUuid } = invitation
    // eslint-disable-next-line no-alert
    if (window.confirm(t('userManagement.confirmDelete', { user: fullName }))) {
      const params = { assessmentName, cycleName, countryIso, invitationUuid }
      await axios.delete(ApiEndPoint.User.invitation(), { params })
      refetchInvitations()
      callback()
    }
  }, [assessmentName, callback, countryIso, cycleName, refetchInvitations, t, user])
}
