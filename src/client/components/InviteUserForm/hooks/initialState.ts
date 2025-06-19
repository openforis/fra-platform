import { useMemo } from 'react'

import { Lang } from 'meta/lang'

import { useLanguage } from 'client/hooks/useLanguage'

export const useInitialState = () => {
  const currentLanguage = useLanguage()

  return useMemo(
    () => ({
      name: '',
      surname: '',
      email: '',
      role: '',
      language: currentLanguage || Lang.en,
      permissions: { tableData: ['all'], descriptions: ['all'] },
    }),
    [currentLanguage]
  )
}
