import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { CountryUserSummary } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useAppDispatch } from 'client/store'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useToaster } from 'client/hooks/useToaster'

import { useRefetchUsers } from './useRefetchUsers'

type Props = {
  countryUserSummary: CountryUserSummary
  callback?: () => void
}

type Returned = {
  resendInvitation: () => void
  isLoading: boolean
}

export const useResendInvitation = (props: Props): Returned => {
  const { countryUserSummary, callback } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { t } = useTranslation()
  const { toaster } = useToaster()

  const dispatch = useAppDispatch()
  const refetchUsers = useRefetchUsers()

  const resendInvitation = useCallback(() => {
    setIsLoading(true)
    const { invitation } = CountryUserSummaries.getCountryRoleAndInvitation(countryUserSummary, countryIso)
    const { uuid: invitationUuid } = invitation
    const params = { assessmentName, countryIso, cycleName, invitationUuid }
    dispatch(UserManagementActions.sendInvitationEmail(params)).then(() => {
      refetchUsers()
      toaster.success(t('userManagement.invitationEmailSent'))
      setIsLoading(false)
      callback?.()
    })
  }, [countryUserSummary, countryIso, assessmentName, cycleName, dispatch, refetchUsers, toaster, t, callback])

  return { resendInvitation, isLoading }
}
