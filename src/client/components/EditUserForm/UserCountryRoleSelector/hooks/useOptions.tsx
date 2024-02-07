import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, Users } from 'meta/user'

import { Option } from 'client/components/Inputs/Select'

type Returned = Array<Option>

export const useOptions = (): Returned => {
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    const options = Object.keys(RoleName).reduce<Returned>((acc, key) => {
      if (key !== RoleName.ADMINISTRATOR) {
        acc.push({
          label: t(Users.getI18nRoleLabelKey(key)),
          value: key,
        })
      }
      return acc
    }, [])

    return options
  }, [t])
}
