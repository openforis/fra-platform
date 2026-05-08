import { useMemo } from 'react'

import { Assessments } from 'meta/assessment/assessments'
import { LoginQueryParams } from 'meta/routes/queryParams/login'
import { Routes } from 'meta/routes/routes'
import { InvitationData } from 'meta/user/invitations/invitation'

import { useSearchParams } from 'client/hooks/searchParams'

export const useGetRedirectUrl = (invitationData: InvitationData | undefined): string => {
  const { invitationUuid } = useSearchParams<LoginQueryParams>()

  return useMemo(() => {
    if (!invitationData || !invitationUuid) return Routes.Root.path.absolute
    const cycle = Assessments.getCycle({
      assessment: invitationData.assessment,
      cycleUuid: invitationData.userInvitation.cycleUuid,
    })
    return Routes.LoginInvitation.generatePath({
      assessmentName: invitationData.assessment.props.name,
      cycleName: cycle.name,
      invitationUuid,
    })
  }, [invitationData, invitationUuid])
}
