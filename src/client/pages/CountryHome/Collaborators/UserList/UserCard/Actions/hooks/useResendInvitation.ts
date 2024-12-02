import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useAppDispatch } from 'client/store'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useToaster } from 'client/hooks/useToaster'

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
  const { user, callback } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { t } = useTranslation()
  const { toaster } = useToaster()

  const dispatch = useAppDispatch()
  const refetchUsers = useRefetchUsers()

  const resendInvitation = useCallback(() => {
    setIsLoading(true)
    const { invitation } = CountryUserSummaries.getCountryRoleAndInvitation(user, countryIso)
    const { uuid: invitationUuid } = invitation
    const params = { assessmentName, countryIso, cycleName, invitationUuid }
    dispatch(UserManagementActions.sendInvitationEmail(params)).then(() => {
      refetchUsers()
      toaster.success(t('userManagement.invitationEmailSent'))
      setIsLoading(false)
      callback?.()
    })
  }, [user, countryIso, assessmentName, cycleName, dispatch, refetchUsers, toaster, t, callback])

  return { resendInvitation, isLoading }
}
