import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Global } from 'meta/area/global'
import { Lang } from 'meta/lang'

import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import i18nGlobal from 'client/i18n'

type UpdateLanguage = (props: { lang: Lang; persist?: boolean }) => Promise<void>
export const useUpdateLanguage = (): UpdateLanguage => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const user = useUser()

  return useCallback<UpdateLanguage>(
    async (props) => {
      const { lang, persist = true } = props

      await i18nGlobal.changeLanguage(lang)

      if (persist) {
        await localStorage.setItem('i18n/lang', lang)
        if (lang === 'ar') document.body.classList.add('rtl')
        if (lang !== 'ar') document.body.classList.remove('rtl')
      }

      // If the user is logged in, update their language preference
      if (persist && user) {
        const formData = new FormData()
        formData.append('user.id', String(user.id))
        formData.append('user.props', JSON.stringify({ lang }))

        const params = { assessmentName, cycleName, countryIso: countryIso ?? Global.WO }
        await axios.put(ApiEndPoint.User.one(), formData, { params })
      }
    },
    [assessmentName, countryIso, cycleName, user]
  )
}

export const useLanguage = (): Lang => {
  const { i18n } = useTranslation()

  return useMemo<Lang>(() => (i18n.resolvedLanguage || i18n.language) as Lang, [i18n.language, i18n.resolvedLanguage])
}
