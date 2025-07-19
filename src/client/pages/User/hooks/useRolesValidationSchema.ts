import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { z, ZodAny } from 'zod'
import { ParsePayload } from 'zod/v4/core'

import { UserEditFormRoles } from 'meta/form/userEdit/form'

export const useRolesValidationSchema = (): ZodAny => {
  const { t } = useTranslation()

  return useMemo<ZodAny>(() => {
    return z.any().check((ctx: ParsePayload) => {
      const values = ctx.value as UserEditFormRoles
      const emptyRoles = Object.values(values).every((value) => {
        if (Array.isArray(value)) return value.length <= 0
        return value !== true
      })
      if (emptyRoles) {
        const message = t('form.errors.atLeastOneRoleRequired')
        ctx.issues.push({ code: 'custom', message, input: ctx.value })
      }
    })
  }, [t])
}
