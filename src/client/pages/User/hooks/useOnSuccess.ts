import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { UserEditCountryForm } from 'meta/form/userEdit/form'
import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store/hooks'
import { UserActions } from 'client/store/user/actions'
import { useUser } from 'client/store/user/hooks/user'
import { useToaster } from 'client/hooks/toaster'
import { FormProps } from 'client/components/Form/types'

type Props = {
  redirectUrl?: string
}

type Returned = FormProps<UserEditCountryForm>['onSuccess']

export const useOnSuccess = (props: Props): Returned => {
  const { redirectUrl } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { toaster } = useToaster()
  const user = useUser()
  const navigate = useNavigate()

  return useCallback<Returned>(
    async (userEditForm, response) => {
      // if logged user is editing him/her self -> after successful edit update user state data
      if (userEditForm.user.id === user.id) {
        const userResponse = await response.json()
        dispatch(UserActions.setUser(userResponse))
      }

      const userMsgParam = `${userEditForm.user.props.name} ${userEditForm.user.props.surname}`
      toaster.info(t('userManagement.userUpdated', { user: userMsgParam }))

      if (!Objects.isEmpty(redirectUrl)) {
        navigate(redirectUrl)
      }
    },
    [dispatch, navigate, redirectUrl, t, toaster, user.id]
  )
}
