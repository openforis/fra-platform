import { TFunction } from 'i18next'
import { z } from 'zod'

const getPermissions = (t: TFunction) =>
  z
    .object({
      tableData: z.array(z.string()).min(1, {
        error: t('form.errors.atLeastOneItemRequired', { field: t('userManagement.permissionNames.tableData') }),
      }),
      descriptions: z.array(z.string()).min(1, {
        error: t('form.errors.atLeastOneItemRequired', {
          field: t('userManagement.permissionNames.descriptions'),
        }),
      }),
    })
    .optional()

export const FormSchemas = {
  getPermissions,
}
