import { useCallback } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { CountryIso } from 'meta/area'
import { UserEditForm } from 'meta/form/userEdit'

import { useAppDispatch } from 'client/store/hooks'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useToaster } from 'client/hooks/useToaster'

type Returned = SubmitHandler<UserEditForm>

export const useOnSubmit = (): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { toaster } = useToaster()

  return useCallback<Returned>(
    (userEdit: UserEditForm) => {
      dispatch(
        UserManagementActions.editUser({
          assessmentName,
          cycleName,
          countryIso,
          userEdit,
        })
      )
        .unwrap()
        .then(() => {
          toaster.info(t('userManagement.userUpdated', { email: userEdit.email }))
          navigate(-1)
        })
        .catch(() => {
          // Error handled by server
        })
    },
    [assessmentName, countryIso, cycleName, dispatch, navigate, t, toaster]
  )
}
