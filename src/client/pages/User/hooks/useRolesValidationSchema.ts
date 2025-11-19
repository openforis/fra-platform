import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'
import { z } from 'zod'

import { RoleName } from 'meta/user/role/name'

// Roles with one or more countries
const countryRoles = [
  RoleName.REVIEWER,
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  RoleName.COLLABORATOR,
  RoleName.VIEWER,
]

const roleSchema = z.object({
  [RoleName.ADMINISTRATOR]: z.boolean().optional(),
  ...Object.fromEntries(countryRoles.map((roleName) => [roleName, z.array(z.string()).optional()])),
})

type Returned = ReturnType<typeof roleSchema.refine>

export const useRolesValidationSchema = (): Returned => {
  const { t } = useTranslation()

  return useMemo(() => {
    return roleSchema.refine(
      (values) => {
        // Check that at least one country role is not empty or is an administrator
        return Object.entries(values).some(([key, value]) => {
          if (key === RoleName.ADMINISTRATOR) return Boolean(value)
          return !Objects.isEmpty(value)
        })
      },
      {
        message: t('form.errors.atLeastOneRoleRequired'),
      }
    )
  }, [t])
}
