import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Routes } from 'meta/routes'

import { useAppDispatch } from 'client/store'
import { LoginActions } from 'client/store/login'
import { InvitationLocalFormData } from 'client/pages/Login/InvitationLocal/InvitationLocal'
import { isError, LoginValidator } from 'client/pages/Login/utils/LoginValidator'

type Props = {
  formData: InvitationLocalFormData
  invitationUuid: string
  setErrors: (value: ((prevState: Record<string, string>) => Record<string, string>) | Record<string, string>) => void
  showPassword2: boolean
}

type Returned = () => void

export const useOnAcceptInvitationLocal = (props: Props): Returned => {
  const { formData, invitationUuid, setErrors, showPassword2 } = props
  const { email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return useCallback<Returned>(() => {
    const fieldErrors = showPassword2
      ? LoginValidator.invitationValidate(email, password, password2)
      : LoginValidator.localValidate(email, password)
    setErrors(fieldErrors)

    if (!isError(fieldErrors)) {
      dispatch(
        LoginActions.localLogin({
          email,
          invitationUuid,
          password,
        })
      ).then(() => {
        navigate(Routes.Root.path.absolute)
      })
    }
  }, [dispatch, email, invitationUuid, navigate, password, password2, setErrors, showPassword2])
}
