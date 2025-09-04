import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Assessments } from 'meta/assessment/assessments'
import { Routes } from 'meta/routes'

import { useAppDispatch } from 'client/store/hooks'
import { LoginActions } from 'client/store/login/actions'
import { useInvitation } from 'client/store/login/hooks/invitation'
import { AcceptInvitationFormState } from 'client/store/login/state'
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

  const { assessment, userInvitation } = useInvitation()
  const { countryIso } = userInvitation
  const cycle = Assessments.getCycle({ assessment, cycleUuid: userInvitation.cycleUuid })
  const assessmentName = assessment?.props.name
  const cycleName = cycle?.name
  const redirectUrl = Routes.Country.generatePath({ assessmentName, countryIso, cycleName })

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
        navigate(redirectUrl)
      })
    }
  }, [dispatch, email, invitationUuid, navigate, password, password2, redirectUrl, showPassword2])
}
