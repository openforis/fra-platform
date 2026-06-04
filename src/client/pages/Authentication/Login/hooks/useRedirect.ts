import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { LoginQueryParams } from 'meta/routes/queryParams/login'
import { Routes } from 'meta/routes/routes'
import { UserInvitations } from 'meta/user/invitations'
import { InvitationData } from 'meta/user/invitations/invitation'
import { Objects } from 'utils/objects'

import { useUser } from 'client/store/user/hooks/user'
import { useSearchParams } from 'client/hooks/searchParams'
import { useToaster } from 'client/hooks/toaster'

import { useGetRedirectUrl } from './useGetRedirectUrl'

type Props = { error: unknown; invitationData: InvitationData; loaded: boolean }
type Returned = { redirectUrl: string }
type Redirect = { message?: string; path?: string; type?: 'error' | 'warning' }

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
  const invitationExpired =
    loaded && Boolean(invitationData && UserInvitations.isExpired(invitationData.userInvitation))

  const redirectHandled = useRef(false)

  // Main redirect logic for edge cases (e.g. wrong user, already accepted, etc)
  useEffect(() => {
    if (redirectHandled.current) return

    let redirect: Redirect | null = null

    if (isSameUser) redirect = { path: redirectUrl }
    else if (isDifferentUser) redirect = { message: t('login.invitationLinkedToDifferentUser'), type: 'error' }
    else if (noInvitation) redirect = { message: t('login.noInvitation'), type: 'error' }
    else if (alreadyAccepted) redirect = { message: t('login.alreadyAcceptedInvitation'), type: 'warning' }
    else if (invitationExpired) redirect = { message: t('login.invitationExpired'), type: 'warning' }

    if (!redirect) return

    redirectHandled.current = true
    if (redirect.message) toaster[redirect.type](redirect.message)

    // path defaults to root
    navigate(redirect.path ?? Routes.Root.generatePath(), { replace: true })
  }, [alreadyAccepted, invitationExpired, isDifferentUser, isSameUser, navigate, noInvitation, redirectUrl, t, toaster])

  return { redirectUrl }
}
