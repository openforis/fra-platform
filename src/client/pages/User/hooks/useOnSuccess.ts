import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { UserEditCountryForm } from 'meta/form/userEdit/form'

import { useToaster } from 'client/hooks/useToaster'
import { FormProps } from 'client/components/Form/types'

export const useOnSuccess = (): FormProps<UserEditCountryForm>['onSuccess'] => {
  const { t } = useTranslation()
  const { toaster } = useToaster()

  return useCallback<FormProps<UserEditCountryForm>['onSuccess']>(
    (userEditForm) => {
      toaster.info(t('userManagement.userUpdated', { email: userEditForm.user.email }))
    },
    [t, toaster]
  )
}
