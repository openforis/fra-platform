import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Contacts } from 'meta/cycleData/contact'
import { Users } from 'meta/user'

import { Option } from 'client/components/Inputs/Select'

type Returned = Array<Option>

export const useOptionsRole = (): Returned => {
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    return Contacts.allowedRoles.map((role) => {
      const label = t(Users.getI18nRoleLabelKey(role))
      const value = role
      return { label, value }
    })
  }, [t])
}
