import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ExplorerCountryOptions } from 'meta/explorer/selection'

type Checkbox = {
  key: keyof ExplorerCountryOptions
  label: string
}

type Returned = Array<Checkbox>

export const useCheckboxes = (): Returned => {
  const { t } = useTranslation()

  return useMemo<Returned>(
    () => [
      { key: 'showIso3', label: t('common.showIso3Code') },
      { key: 'showIso2', label: t('common.showIso2Code') },
      { key: 'showM49', label: t('common.showM49Code') },
      { key: 'showDeskStudy', label: t('common.showDeskStudyCode') },
    ],
    [t]
  )
}
