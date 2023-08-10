import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Lang } from 'meta/lang'

type UpdateLanguage = (props: { lang: Lang; persist?: boolean }) => Promise<void>

export const useUpdateLanguage = (): UpdateLanguage => {
  const { i18n } = useTranslation()

  return useCallback<UpdateLanguage>(
    async (props) => {
      const { lang, persist = true } = props

      await i18n.changeLanguage(lang)

      if (persist) {
        await localStorage.setItem('i18n/lang', lang)
        if (lang === 'ar') document.body.classList.add('rtl')
        if (lang !== 'ar') document.body.classList.remove('rtl')
      }
      // TODO: Add user.language support
    },
    [i18n]
  )
}

export const useLanguage = (): Lang => {
  const { i18n } = useTranslation()

  return useMemo<Lang>(() => i18n.resolvedLanguage as Lang, [i18n.resolvedLanguage])
}
