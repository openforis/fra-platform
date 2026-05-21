import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { Routes } from 'meta/routes/routes'
import { InvitationData } from 'meta/user/invitations/invitation'

import { useUser } from 'client/store/user/hooks/user'
import { useToaster } from 'client/hooks/toaster'

import { useGetRedirectUrl } from './useGetRedirectUrl'

type Props = { invitationData: InvitationData }
type Returned = { redirectUrl: string }

export const useRedirect = (props: Props): Returned => {
  const { invitationData } = props
  const user = useUser()

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { toaster } = useToaster()

  const redirectUrl = useGetRedirectUrl(invitationData)

  const isSameUser = Boolean(invitationData && user?.uuid === invitationData.user.uuid)
  const isDifferentUser = Boolean(invitationData && user && user.uuid !== invitationData.user.uuid)

  useEffect(() => {
    if (isSameUser) {
      navigate(redirectUrl, { replace: true })
    }
  }, [isSameUser, navigate, redirectUrl])

  useEffect(() => {
    if (isDifferentUser) {
      toaster.error(t('login.invitationLinkedToDifferentUser'))
      navigate(Routes.Root.generatePath(), { replace: true })
    }
  }, [isDifferentUser, navigate, t, toaster])

  return { redirectUrl }
}
