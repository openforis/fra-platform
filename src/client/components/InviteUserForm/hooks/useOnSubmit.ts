import { useCallback } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { CountryIso } from 'meta/area'
import { UserInvitationForm } from 'meta/form/userInvitation'

import { useAppDispatch } from 'client/store/hooks'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useToaster } from 'client/hooks/useToaster'

type Returned = SubmitHandler<UserInvitationForm>

export const useOnSubmit = (): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { toaster } = useToaster()

  return useCallback<Returned>(
    (userInvitation: UserInvitationForm) => {
      dispatch(UserManagementActions.inviteUser({ assessmentName, cycleName, countryIso, userInvitation }))
        .unwrap()
        .then(() => {
          toaster.info(t('userManagement.userAdded', { email: userInvitation.email }))
          navigate(-1)
        })
        .catch(() => {
          // Error handled by server
        })
    },
    [assessmentName, countryIso, cycleName, dispatch, navigate, t, toaster]
  )
}
