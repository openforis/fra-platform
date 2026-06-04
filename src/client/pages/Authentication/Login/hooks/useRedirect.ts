import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { LoginQueryParams } from 'meta/routes/queryParams/login'
import { Routes } from 'meta/routes/routes'
import { InvitationData } from 'meta/user/invitations/invitation'
import { Objects } from 'utils/objects'

import { useUser } from 'client/store/user/hooks/user'
import { useSearchParams } from 'client/hooks/searchParams'
import { useToaster } from 'client/hooks/toaster'

import { useGetRedirectUrl } from './useGetRedirectUrl'

type Props = { error: unknown; invitationData: InvitationData; loaded: boolean }
type Returned = { redirectUrl: string }

export const useRedirect = (props: Props): Returned => {
  const { error, invitationData, loaded } = props
  const user = useUser()

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { toaster } = useToaster()
  const { invitationUuid } = useSearchParams<LoginQueryParams>()

  const redirectUrl = useGetRedirectUrl(invitationData)

  const hasInvitationUuid = !Objects.isEmpty(invitationUuid)
  const isSameUser = Boolean(invitationData && user?.uuid === invitationData.user.uuid)
  const isDifferentUser = Boolean(invitationData && user && user.uuid !== invitationData.user.uuid)
  const noInvitation = hasInvitationUuid && ((loaded && Objects.isEmpty(invitationData)) || Boolean(error))
  const alreadyAccepted = loaded && Boolean(invitationData?.userInvitation.acceptedAt)

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

  const redirectHandled = useRef(false)

  useEffect(() => {
    if (redirectHandled.current) return

    if (noInvitation) {
      redirectHandled.current = true
      toaster.error(t('login.noInvitation'))
      navigate('/', { replace: true })
    } else if (alreadyAccepted) {
      redirectHandled.current = true
      toaster.warning(t('login.alreadyAcceptedInvitation'))
      navigate('/', { replace: true })
    }
  }, [alreadyAccepted, navigate, noInvitation, t, toaster])

  return { redirectUrl }
}
