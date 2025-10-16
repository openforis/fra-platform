import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useToaster } from 'client/hooks/toaster'

import type { Props as BaseProps } from '../../Props'
import { useRefetchUsers } from './useRefetchUsers'

type Props = BaseProps & {
  callback?: () => void
}

type Returned = {
  resendInvitation: () => void
  isLoading: boolean
}

export const useResendInvitation = (props: Props): Returned => {
  const { callback, user } = props
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { t } = useTranslation()
  const { toaster } = useToaster()

  const refetchUsers = useRefetchUsers()

  const resendInvitation = useCallback(async () => {
    setIsLoading(true)
    try {
      const { invitation } = CountryUserSummaries.getCountryRoleAndInvitation(user, countryIso)
      const { uuid: invitationUuid } = invitation
      const params = { assessmentName, countryIso, cycleName, invitationUuid }

      await axios.get(ApiEndPoint.User.invitationSendEmail(), { params })

      refetchUsers()
      toaster.success(t('userManagement.invitationEmailSent'))
      callback?.()
    } finally {
      setIsLoading(false)
    }
  }, [assessmentName, callback, countryIso, cycleName, refetchUsers, t, toaster, user])

  return { resendInvitation, isLoading }
}
