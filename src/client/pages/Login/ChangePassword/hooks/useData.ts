import { useEffect } from 'react'
import { useParams } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useGetRequest } from 'client/hooks/getRequest'

type Returned = {
  user: {
    email: string
  }
}

export const useData = (): Returned | undefined => {
  const { resetPasswordUuid } = useParams<{ resetPasswordUuid: string }>()

  const { data, dispatch: fetchData } = useGetRequest(ApiEndPoint.User.resetPassword(), {
    params: { resetPasswordUuid },
  })

  useEffect(() => {
    if (resetPasswordUuid) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPasswordUuid])

  return data
}
