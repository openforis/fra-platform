import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { z } from 'zod'

import { CountryIso } from 'meta/area'
import { LanguageCodes } from 'meta/lang'
import { RoleName, Users } from 'meta/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { FormDefinition, FormType } from 'client/components/Form'

export const useFormDefinition = (): Array<FormDefinition> => {
  const { countryIso } = useCountryRouteParams<CountryIso>()

  const { t } = useTranslation()
  const user = useUser()
  const cycle = useCycle()

  const roleOptions = useMemo(() => {
    return Users.getRolesAllowedToEdit({ user, countryIso, cycle }).map((role: RoleName) => ({
      label: t(Users.getI18nRoleLabelKey(role)),
      value: role,
    }))
  }, [countryIso, cycle, t, user])

  const languageOptions = useMemo(() => {
    return LanguageCodes.map((lang) => ({
      label: t(`language.${lang}`),
      value: lang,
    }))
  }, [t])

  return useMemo(
    () => [
      {
        name: 'name',
        type: FormType.text,
        validation: z.string().min(2, 'Name must be at least 2 characters.'),
        label: 'common.name',
      },
      {
        name: 'surname',
        type: FormType.text,
        validation: z.string().min(2, 'Surname must be at least 2 characters.'),
        label: 'editUser.surname',
      },
      {
        name: 'email',
        type: FormType.text,
        validation: z.string().email('Please enter a valid email address.'),
        label: 'editUser.email',
      },
      {
        name: 'role',
        type: FormType.select,
        validation: z.string().min(1, 'Please select a role.'),
        label: 'common.role',
        options: roleOptions,
        placeholder: t('userManagement.placeholder'),
      },
      {
        name: 'language',
        type: FormType.select,
        validation: z.string().min(1, 'Please select a language.'),
        label: 'common.language',
        options: languageOptions,
      },
      {
        name: 'permissions',
        type: FormType.permissions,
        label: 'userManagement.permissions',
        shouldShow: (watchValues) => watchValues.role === RoleName.COLLABORATOR,
      },
    ],
    [languageOptions, roleOptions, t]
  )
}
