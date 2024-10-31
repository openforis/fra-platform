import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { UserInvitationSummary } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useToaster } from 'client/hooks/useToaster'
import { useRefetchInvitations } from 'client/pages/CountryHome/Collaborators/UserList/UserInvitations/Buttons/hooks/useRefetchInvitations'

type Props = {
  invitationSummary: UserInvitationSummary
  callback?: () => void
}

type Returned = {
  resendInvitation: () => void
  isLoading: boolean
}

export const useResendInvitation = (props: Props): Returned => {
  const { invitationSummary, callback } = props
  const { uuid: invitationUuid } = invitationSummary
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { t } = useTranslation()
  const { toaster } = useToaster()

  const dispatch = useAppDispatch()
  const refetchInvitations = useRefetchInvitations()

  const resendInvitation = useCallback(() => {
    setIsLoading(true)
    const params = { assessmentName, countryIso, cycleName, invitationUuid }
    dispatch(UserManagementActions.sendInvitationEmail(params)).then(() => {
      refetchInvitations()
      toaster.success(t('userManagement.invitationEmailSent'))
      setIsLoading(false)
      callback?.()
    })
  }, [assessmentName, countryIso, cycleName, invitationUuid, dispatch, refetchInvitations, toaster, t, callback])

  return { resendInvitation, isLoading }
}
