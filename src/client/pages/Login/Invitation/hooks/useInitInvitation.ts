import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { LoginInvitationQueryParams } from 'meta/routes/queryParams/invitation'
import { Routes } from 'meta/routes/routes'

import { useAppDispatch } from 'client/store/hooks'
import { LoginActions } from 'client/store/login/actions'
import { useSearchParams } from 'client/hooks/searchParams'

export const useInitInvitation = (): void => {
  const { invitationUuid } = useSearchParams<LoginInvitationQueryParams>()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (invitationUuid) {
      dispatch(LoginActions.fetchUserByInvitation({ invitationUuid }))
    } else {
      navigate(Routes.Root.generatePath())
    }
  }, [dispatch, invitationUuid, navigate])
}
