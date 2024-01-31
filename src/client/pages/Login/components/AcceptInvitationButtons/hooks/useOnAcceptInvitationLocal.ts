import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Routes } from 'meta/routes'

import { useAppDispatch } from 'client/store'
import { LoginActions } from 'client/store/login'
import { AcceptInvitationFormState } from 'client/store/login/stateType'
import { isError, LoginValidator } from 'client/pages/Login/utils/LoginValidator'

type Props = {
  formData: AcceptInvitationFormState | undefined
  invitationUuid: string
  showPassword2: boolean
}

type Returned = () => void

export const useOnAcceptInvitationLocal = (props: Props): Returned => {
  const { formData, invitationUuid, showPassword2 } = props
  const { email, password, password2 } = formData ?? {}

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return useCallback<Returned>(() => {
    const fieldErrors = showPassword2
      ? LoginValidator.invitationValidate(email, password, password2)
      : LoginValidator.localValidate(email, password)
    dispatch(LoginActions.updateAcceptInvitationFormErrors(fieldErrors))

    if (!isError(fieldErrors)) {
      dispatch(
        LoginActions.localLogin({
          email,
          invitationUuid,
          password,
        })
      ).then(() => {
        dispatch(LoginActions.resetAcceptInvitationForm())
        navigate(Routes.Root.path.absolute)
      })
    }
  }, [dispatch, email, invitationUuid, navigate, password, password2, showPassword2])
}
