import { useMemo } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

type Props = {
  assessmentName: string
  cycleName: string
  invitationUuid?: string
}

export const useHref = (props: Props): string => {
  const { assessmentName, cycleName, invitationUuid } = props

  return useMemo(() => {
    const params = new URLSearchParams({ assessmentName, cycleName })
    if (invitationUuid) params.append('invitationUuid', invitationUuid)
    return `${ApiEndPoint.Auth.google()}?${params.toString()}`
  }, [assessmentName, cycleName, invitationUuid])
}
