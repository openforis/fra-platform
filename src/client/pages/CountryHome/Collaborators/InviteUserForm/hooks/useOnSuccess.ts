import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { UserInvitationForm } from 'meta/form/userInvitation'

import { useToaster } from 'client/hooks/useToaster'
import { FormProps } from 'client/components/Form/types'

export const useOnSuccess = (): FormProps<UserInvitationForm>['onSuccess'] => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { toaster } = useToaster()

  return useCallback<FormProps<UserInvitationForm>['onSuccess']>(
    (userInvitation: UserInvitationForm) => {
      toaster.info(t('userManagement.userAdded', { email: userInvitation.email }))
      navigate(-1)
    },
    [navigate, t, toaster]
  )
}
