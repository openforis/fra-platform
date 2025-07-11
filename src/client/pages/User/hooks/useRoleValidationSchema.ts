import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'
import { z } from 'zod'

import { RoleName, UserContactPreferenceMethod, UserContactPreferencePhoneOption } from 'meta/user/userRole'

export const useRoleValidationSchema = () => {
  const { t } = useTranslation()

  return useMemo(() => {
    const allowedRoles = [
      RoleName.REVIEWER,
      RoleName.NATIONAL_CORRESPONDENT,
      RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
      RoleName.COLLABORATOR,
      RoleName.VIEWER,
    ] as const

    return z.object({
      role: z.enum(allowedRoles).optional(),
      uuid: z.string(),
      props: z
        .object({
          professionalTitle: z.string().optional(),
          organizationalUnit: z.string().optional(),
          organization: z.string().min(1, { error: t('form.errors.required', { field: t('editUser.organization') }) }),
          address: z.object({
            street: z.string().min(1, { error: t('form.errors.required', { field: t('editUser.street') }) }),
            zipCode: z.string().min(1, { error: t('form.errors.required', { field: t('editUser.zipCode') }) }),
            poBox: z.string().optional(),
            city: z.string().min(1, { error: t('form.errors.required', { field: t('editUser.city') }) }),
            countryIso: z.string().optional(),
          }),
          secondaryEmail: z
            .email(t('form.errors.invalid', { field: t('editUser.secondaryEmail') }))
            .optional()
            .or(z.literal('')),
          primaryPhoneNumber: z
            .string()
            .min(1, { error: t('form.errors.required', { field: t('editUser.primaryPhoneNumber') }) })
            .refine((val) => z.e164().safeParse(val).success, {
              error: t('form.errors.invalid', { field: t('editUser.primaryPhoneNumber') }),
            }),
          secondaryPhoneNumber: z
            .e164(t('form.errors.invalid', { field: t('editUser.secondaryPhoneNumber') }))
            .optional()
            .or(z.literal('')),
          skype: z.string().optional(),
          contactPreference: z
            .object({
              method: z.enum(UserContactPreferenceMethod, {
                error: t('form.errors.required', { field: t('editUser.contactPreference') }),
              }),
              options: z
                .object({
                  phone: z
                    .enum(UserContactPreferencePhoneOption, {
                      error: t('form.errors.required', { field: t('editUser.channel') }),
                    })
                    .optional(),
                })
                .optional(),
            })
            .refine(
              (data) => {
                // Phone methods require a phone option to be selected
                if (
                  data.method === UserContactPreferenceMethod.primaryPhoneNumber ||
                  data.method === UserContactPreferenceMethod.secondaryPhoneNumber
                ) {
                  return !Objects.isNil(data.options?.phone)
                }
                return true
              },
              {
                error: t('form.errors.required', { field: t('editUser.channel') }),
                path: ['options', 'phone'],
              }
            )
            .optional(),
        })
        .optional(),
    })
  }, [t])
}
