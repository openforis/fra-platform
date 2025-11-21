import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { UserEditCountryForm } from 'meta/form/userEdit/form'

import { useAppDispatch } from 'client/store/hooks'
import { UserActions } from 'client/store/user/actions'
import { useUser } from 'client/store/user/hooks/user'
import { useToaster } from 'client/hooks/toaster'
import { FormProps } from 'client/components/Form/types'

type Returned = FormProps<UserEditCountryForm>['onSuccess']

export const useOnSuccess = (): Returned => {
  const { t } = useTranslation()
  const { toaster } = useToaster()
  const user = useUser()
  const dispatch = useAppDispatch()

  return useCallback<Returned>(
    async (userEditForm, response) => {
      // if logged user is editing him/her self -> after successful edit update user state data
      if (userEditForm.user.id === user.id) {
        const userResponse = await response.json()
        dispatch(UserActions.setUser(userResponse))
      }

      toaster.info(t('userManagement.userUpdated', { email: userEditForm.user.email }))
    },
    [dispatch, t, toaster, user.id]
  )
}
