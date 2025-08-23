import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import axios from 'axios'
import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Global } from 'meta/area'
import { Lang } from 'meta/lang'

import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type UpdateLanguage = (props: { lang: Lang; persist?: boolean }) => Promise<void>

export const useUpdateLanguage = (): UpdateLanguage => {
  const { i18n } = useTranslation()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const user = useUser()

  return useCallback<UpdateLanguage>(
    async (props) => {
      const { lang, persist = true } = props

      await i18n.changeLanguage(lang)

      if (persist) {
        await localStorage.setItem('i18n/lang', lang)
        if (lang === 'ar') document.body.classList.add('rtl')
        if (lang !== 'ar') document.body.classList.remove('rtl')
      }

      // If the user is logged in, update their language preference
      if (persist && user) {
        const updatedUser = Objects.setInPath({ obj: user, path: ['props', 'lang'], value: lang })

        const params = { assessmentName, cycleName, countryIso: countryIso ?? Global.WO }
        await axios.put(ApiEndPoint.User.one(), { user: updatedUser }, { params })
      }
    },
    [assessmentName, countryIso, cycleName, i18n, user]
  )
}

export const useLanguage = (): Lang => {
  const { i18n } = useTranslation()

  return useMemo<Lang>(() => i18n.resolvedLanguage as Lang, [i18n.resolvedLanguage])
}
