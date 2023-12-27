import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Contacts } from 'meta/cycleData/contact'

import { Option } from 'client/components/Inputs/Select'

type Returned = Array<Option>

export const useOptionsAppellation = (): Returned => {
  const { t } = useTranslation()

  return useMemo<Returned>(() => {
    return Contacts.appellations.map((appellation) => {
      const label = t(`editUser.${appellation}`)
      const value = appellation
      return { label, value }
    })
  }, [t])
}
