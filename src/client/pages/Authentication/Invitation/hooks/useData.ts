import { useEffect } from 'react'
import { useParams } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'
import { InvitationData } from 'meta/user/invitations/invitation'

import { useGetRequest } from 'client/hooks/getRequest'

export const useData = (): InvitationData | undefined => {
  const { invitationUuid } = useParams<{ invitationUuid: string }>()
  const { data, dispatch: fetchData } = useGetRequest(ApiEndPoint.User.invitation(), {
    params: { invitationUuid },
  })

  useEffect(() => {
    if (invitationUuid) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitationUuid])

  if (!data?.userInvitation) return undefined

  return data as InvitationData
}
