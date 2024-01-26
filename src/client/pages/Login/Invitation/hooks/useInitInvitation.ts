import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoginInvitationQueryParams } from 'meta/routes'

import { useAppDispatch } from 'client/store'
import { LoginActions } from 'client/store/login'
import { useSearchParams } from 'client/hooks/useSearchParams'

export const useInitInvitation = (): void => {
  const { invitationUuid } = useSearchParams<LoginInvitationQueryParams>()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (invitationUuid) {
      dispatch(LoginActions.fetchUserByInvitation({ invitationUuid }))
    } else {
      navigate('/')
    }
  }, [dispatch, invitationUuid, navigate])
}
