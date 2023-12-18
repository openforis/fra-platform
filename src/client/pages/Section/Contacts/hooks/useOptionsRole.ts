import { useMemo } from 'react'

import { Contacts } from 'meta/cycleData/contact'
import { Users } from 'meta/user'

import { Options } from './options'

export const useOptionsRole = () => {
  return useMemo<Options>(() => {
    return Contacts.allowedRoles.map((role) => {
      const label = { key: Users.getI18nRoleLabelKey(role) }
      const value = role
      return { label, value }
    })
  }, [])
}
