import { useEffect } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { LoginQueryParams } from 'meta/routes/queryParams/login'
import { InvitationData } from 'meta/user/invitations/invitation'
import { Objects } from 'utils/objects'

import { useGetRequest } from 'client/hooks/getRequest'
import { useSearchParams } from 'client/hooks/searchParams'

type Returned = {
  error: unknown
  invitationData: InvitationData
  loaded: boolean
  loading: boolean
}
export const useGetInvitation = (): Returned => {
  const { invitationUuid } = useSearchParams<LoginQueryParams>()
  const {
    data: invitationData,
    dispatch: fetchData,
    error,
    loaded,
    loading,
  } = useGetRequest(ApiEndPoint.User.invitation(), {
    params: { invitationUuid },
  })

  useEffect(() => {
    if (!Objects.isEmpty(invitationUuid)) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitationUuid])

  return { error, invitationData, loaded, loading }
}
