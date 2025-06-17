import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { CountryIso } from 'meta/area'
import { Lang } from 'meta/lang'
import { CollaboratorPermissions, RoleName } from 'meta/user'

import { useAppDispatch } from 'client/store/hooks'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useToaster } from 'client/hooks/useToaster'

interface FormValues {
  name: string
  surname: string
  email: string
  role: string
  language: string
  permissions?: CollaboratorPermissions
}

export const useOnSubmit = (): SubmitHandler<FormValues> => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { toaster } = useToaster()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(
      UserManagementActions.inviteUser({
        assessmentName,
        cycleName,
        countryIso,
        email: data.email,
        lang: data.language as Lang,
        name: data.name,
        permissions: data.permissions,
        role: data.role as RoleName,
        surname: data.surname,
      })
    )
      .unwrap()
      .then(() => {
        toaster.info(t('userManagement.userAdded', { email: data.email }))
        navigate(-1)
      })
      .catch(() => {
        // Error handled by server
      })
  }

  return onSubmit
}