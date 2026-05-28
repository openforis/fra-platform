import { useMemo } from 'react'

import { LoginQueryParams } from 'meta/routes/queryParams/login'
import { Routes } from 'meta/routes/routes'
import { InvitationData } from 'meta/user/invitations/invitation'

import { useSearchParams } from 'client/hooks/searchParams'

export const useGetRedirectUrl = (invitationData: InvitationData | undefined): string => {
  const { invitationUuid } = useSearchParams<LoginQueryParams>()

  return useMemo(() => {
    if (!invitationData || !invitationUuid) return Routes.Root.path.absolute

    const { assessmentName, cycleName } = invitationData

    return Routes.LoginInvitation.generatePath({ assessmentName, cycleName, invitationUuid })
  }, [invitationData, invitationUuid])
}
