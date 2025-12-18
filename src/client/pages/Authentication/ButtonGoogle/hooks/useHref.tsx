import { useMemo } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import { DataInvitation } from 'client/pages/Authentication/Invitation/hooks/useData'

export const useHref = (data?: DataInvitation): string => {
  const routeParams = useCycleRouteParams()

  return useMemo(() => {
    const assessmentName = data ? data.assessmentName : routeParams.assessmentName
    const cycleName = data ? data.cycleName : routeParams.cycleName
    const countryIso = data?.userInvitation?.countryIso
    const invitationUuid = data?.userInvitation?.uuid

    const params = new URLSearchParams({ assessmentName, cycleName })
    if (countryIso) params.append('countryIso', countryIso)
    if (invitationUuid) params.append('invitationUuid', invitationUuid)

    return `${ApiEndPoint.Auth.google()}?${params.toString()}`
  }, [data, routeParams])
}
