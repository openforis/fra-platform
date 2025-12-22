import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { LoginLocalResponse } from 'meta/auth/local'
import { Routes } from 'meta/routes/routes'

import { useAppDispatch } from 'client/store/hooks'
import { UserActions } from 'client/store/user/actions'
import { useToaster } from 'client/hooks/toaster'
import { FormProps } from 'client/components/Form/types'

export const useOnSuccess = (): NonNullable<FormProps['onSuccess']> => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { toaster } = useToaster()

  return useCallback<NonNullable<FormProps['onSuccess']>>(
    async (_values, response): Promise<void> => {
      const { info, user } = (await response.json()) as LoginLocalResponse

      dispatch(UserActions.setUser(user))
      navigate(Routes.Root.path.absolute)

      if (info?.message) {
        toaster.info(info.message)
      }
    },
    [dispatch, navigate, toaster]
  )
}
