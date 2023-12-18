import { useMemo } from 'react'

import { Contacts } from 'meta/cycleData/contact'

import { Options } from './options'

export const useOptionsAppellation = (): Options => {
  return useMemo<Options>(() => {
    return Contacts.appellations.map((appellation) => {
      const label = { key: `editUser.${appellation}` }
      const value = appellation
      return { label, value }
    })
  }, [])
}
