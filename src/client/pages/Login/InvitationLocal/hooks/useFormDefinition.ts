import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { LoginInvitationQueryParams } from 'meta/routes/queryParams/invitation'
import { AuthProvider } from 'meta/user/auth'
import { User } from 'meta/user/user'

import { useSearchParams } from 'client/hooks/searchParams'
import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'

import { useShowPassword2 } from './useShowPassword2'

type Props = { userProviders: Array<AuthProvider>; invitedUser: User }

export const useFormDefinition = (props: Props): FormDefinition => {
  const { invitedUser, userProviders } = props
  const { t } = useTranslation()
  const { invitationUuid } = useSearchParams<LoginInvitationQueryParams>()

  const showPassword2 = useShowPassword2({ invitedUser, userProviders })

  return useMemo<FormDefinition>(() => {
    const fields: Array<FieldDefinition> = [
      {
        defaultValue: invitationUuid,
        label: '',
        name: 'invitationUuid',
        required: true,
        type: FormFieldType.hidden,
      },
      {
        bordered: true,
        defaultValue: invitedUser.email,
        label: 'login.email',
        name: 'email',
        placeholder: t('login.email'),
        required: true,
        type: FormFieldType.text,
        watches: {
          isDisabled: () => true,
        },
      },
      {
        bordered: true,
        defaultValue: '',
        label: 'login.password',
        name: 'password',
        placeholder: t('login.password'),
        required: true,
        type: FormFieldType.password,
      },
    ]

    if (showPassword2) {
      fields.push({
        bordered: true,
        defaultValue: '',
        label: 'login.repeatPassword',
        name: 'password2',
        placeholder: t('login.repeatPassword'),
        required: true,
        type: FormFieldType.password,
      })
    }

    return { fields }
  }, [invitationUuid, invitedUser.email, showPassword2, t])
}
