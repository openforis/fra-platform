import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { UserEditForm } from 'meta/form/userEdit'

import { useToaster } from 'client/hooks/useToaster'
import { FormProps } from 'client/components/Form/types'

export const useOnSuccess = (): FormProps<UserEditForm>['onSuccess'] => {
  const { t } = useTranslation()
  const { toaster } = useToaster()

  return useCallback<FormProps<UserEditForm>['onSuccess']>(
    (userEditForm) => {
      toaster.info(t('userManagement.userUpdated', { email: userEditForm.email }))
    },
    [t, toaster]
  )
}
