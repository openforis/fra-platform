import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { z } from 'zod'

import { CountryIso } from 'meta/area'
import { LanguageCodes } from 'meta/lang'
import { RoleName, Users } from 'meta/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'
import { Option } from 'client/components/Inputs/Select'

export const useFormDefinition = (): FormDefinition => {
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const user = useUser()
  const cycle = useCycle()

  const roleOptions = useMemo<Array<Option>>(() => {
    return Users.getRolesAllowedToEdit({ user, countryIso, cycle }).map((role: RoleName) => ({
      label: t(Users.getI18nRoleLabelKey(role)),
      value: role,
    }))
  }, [countryIso, cycle, t, user])

  const languageOptions = useMemo<Array<Option>>(() => {
    return LanguageCodes.map((lang) => ({
      label: t(`language.${lang}`),
      value: lang,
    }))
  }, [t])

  return useMemo<FormDefinition>(() => {
    const fields: Array<FieldDefinition> = [
      {
        name: 'name',
        type: FormFieldType.text,
        validation: z.string().min(2, t('form.errors.mustBeAtLeastNCharacters', { field: t('common.name'), n: 2 })),
        label: 'common.name',
      },
      {
        name: 'surname',
        type: FormFieldType.text,
        validation: z
          .string()
          .min(2, t('form.errors.mustBeAtLeastNCharacters', { field: t('editUser.surname'), n: 2 })),
        label: 'editUser.surname',
      },
      {
        name: 'email',
        type: FormFieldType.text,
        validation: z.string().email(t('form.errors.invalid', { field: t('common.email') })),
        label: 'editUser.email',
      },
      {
        name: 'role',
        type: FormFieldType.select,
        validation: z.string().min(1, t('form.errors.required', { field: t('editUser.role') })),
        label: 'common.role',
        options: roleOptions,
        placeholder: t('userManagement.placeholder'),
      },
      {
        name: 'language',
        type: FormFieldType.select,
        validation: z.string().min(1, t('form.errors.required', { field: t('common.language') })),
        label: 'common.language',
        options: languageOptions,
      },
      {
        name: 'permissions',
        type: FormFieldType.permissions,
        label: 'userManagement.permissions',
        shouldShow: (watchValues) => watchValues.role === RoleName.COLLABORATOR,
      },
    ]

    return { fields }
  }, [languageOptions, roleOptions, t])
}
