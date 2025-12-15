import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { Routes } from 'meta/routes/routes'

import { useAppDispatch } from 'client/store/hooks'
import { UserActions } from 'client/store/user/actions'
import { FormProps } from 'client/components/Form/types'

export const useOnSuccess = (): NonNullable<FormProps['onSuccess']> => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return useCallback<NonNullable<FormProps['onSuccess']>>(
    async (_values, response): Promise<void> => {
      const user = await response.json()
      dispatch(UserActions.setUser(user))
      navigate(Routes.Root.path.absolute)
    },
    [dispatch, navigate]
  )
}
