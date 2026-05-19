import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { Routes } from 'meta/routes/routes'
import { User } from 'meta/user/user'

import { useAppDispatch } from 'client/store/hooks'
import { UserActions } from 'client/store/user/actions'

type Returned = (values: unknown, response: Response) => Promise<void>
export const useOnFormAccept = (): Returned => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return useCallback(
    async (_values: unknown, response: Response): Promise<void> => {
      const { user } = (await response.json()) as { user: User }
      dispatch(UserActions.setUser(user))
      navigate(Routes.Root.generatePath())
    },
    [dispatch, navigate]
  )
}
