import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { Routes } from 'meta/routes/routes'
import { InvitationData } from 'meta/user/invitations/invitation'
import { User } from 'meta/user/user'

import { useAppDispatch } from 'client/store/hooks'
import { UserActions } from 'client/store/user/actions'

type Props = {
  data: InvitationData
}

type Returned = (values: unknown, response: Response) => Promise<void>

export const useOnFormAccept = (props: Props): Returned => {
  const { data } = props
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return useCallback(
    async (_values: unknown, response: Response): Promise<void> => {
      const { assessmentName, cycleName, userInvitation } = data
      const { countryIso } = userInvitation
      const { user } = (await response.json()) as { user: User }
      dispatch(UserActions.setUser(user))
      navigate(Routes.Country.generatePath({ assessmentName, cycleName, countryIso }))
    },
    [data, dispatch, navigate]
  )
}
