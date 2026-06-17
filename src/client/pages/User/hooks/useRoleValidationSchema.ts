import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { z, ZodObject } from 'zod'

import { RoleName } from 'meta/user/role/name'
import { UserContactPreferenceMethod, UserContactPreferencePhoneOption } from 'meta/user/role/props'
import { Objects } from 'utils/objects'

import { getLinkValidationError } from 'client/components/EditorWYSIWYG/hooks/useLinkValidationErrors'
import { FormSchemas } from 'client/components/Form/formSchemas'

export const useRoleValidationSchema = (): ZodObject => {
  const { t } = useTranslation()

  return useMemo(() => {
    const allowedRoles = [
      RoleName.REGIONAL_FOCAL_POINT,
      RoleName.REVIEWER,
      RoleName.NATIONAL_CORRESPONDENT,
      RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
      RoleName.COLLABORATOR,
      RoleName.VIEWER,
    ] as const

    return z.object({
      role: z.enum(allowedRoles).optional(),
      uuid: z.string(),
      permissions: FormSchemas.getPermissions(t),
      props: z
        .object({
          professionalTitle: z.string().optional(),
          organizationalUnit: z.string().optional(),
          organization: z
            .string()
            .min(1, { error: t('form.errors.required', { field: t('editUser.organization') }) })
            .refine(
              (value) => {
                // Check that the org link is not empty.
                if (Objects.isEmpty(value)) return true
                return Objects.isEmpty(getLinkValidationError({ enabled: true, t, value }))
              },
              { error: t('generalValidation.invalidLink') }
            ),
          address: z.object({
            street: z.string().min(1, { error: t('form.errors.required', { field: t('editUser.street') }) }),
            zipCode: z.string().min(1, { error: t('form.errors.required', { field: t('editUser.zipCode') }) }),
            poBox: z.string().optional(),
            city: z.string().min(1, { error: t('form.errors.required', { field: t('editUser.city') }) }),
            countryIso: z.string().min(1, { error: t('form.errors.required', { field: t('editUser.countryIso') }) }),
          }),
          secondaryEmail: z
            .email(t('form.errors.invalid', { field: t('editUser.secondaryEmail') }))
            .optional()
            .or(z.literal('')),
          primaryPhoneNumber: z
            .string()
            .min(1, { error: t('form.errors.required', { field: t('editUser.primaryPhoneNumber') }) }),
          secondaryPhoneNumber: z.string().optional().or(z.literal('')),
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
