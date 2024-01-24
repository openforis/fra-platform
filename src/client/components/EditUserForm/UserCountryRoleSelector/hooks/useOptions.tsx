import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, Users } from 'meta/user'

export const useOptions = () => {
  const { t } = useTranslation()
  return useMemo(
    () =>
      Object.keys(RoleName).reduce<Record<string, string>>((acc, key) => {
        if (key !== RoleName.ADMINISTRATOR) {
          // eslint-disable-next-line no-param-reassign
          acc[key] = t(Users.getI18nRoleLabelKey(key))
        }
        return acc
      }, {}),
    [t]
  )
}
