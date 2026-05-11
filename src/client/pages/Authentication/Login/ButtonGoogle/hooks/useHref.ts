import { useMemo } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Assessments } from 'meta/assessment/assessments'
import { InvitationData } from 'meta/user/invitations/invitation'

import { useCycleRouteParams } from 'client/hooks/routeParams'

export const useHref = (invitationData?: InvitationData): string => {
  const { assessmentName, cycleName } = useCycleRouteParams()

  return useMemo(() => {
    if (invitationData) {
      const cycle = Assessments.getCycle({
        assessment: invitationData.assessment,
        cycleUuid: invitationData.userInvitation.cycleUuid,
      })
      const params = new URLSearchParams({
        assessmentName: invitationData.assessment.props.name,
        cycleName: cycle.name,
        invitationUuid: invitationData.userInvitation.uuid,
      })
      return `${ApiEndPoint.Auth.google()}?${params.toString()}`
    }
    const params = new URLSearchParams({ assessmentName, cycleName })
    return `${ApiEndPoint.Auth.google()}?${params.toString()}`
  }, [assessmentName, cycleName, invitationData])
}
