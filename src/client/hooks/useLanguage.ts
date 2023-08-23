import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Global } from 'meta/area'
import { Lang } from 'meta/lang'

import { useAppDispatch } from 'client/store'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type UpdateLanguage = (props: { lang: Lang; persist?: boolean }) => Promise<void>

export const useUpdateLanguage = (): UpdateLanguage => {
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
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
        dispatch(
          UserManagementActions.updateUser({
            assessmentName,
            cycleName,
            user: {
              ...user,
              props: {
                ...user.props,
                lang,
              },
            },
            countryIso: countryIso ?? Global.WO,
          })
        )
      }
    },
    [assessmentName, countryIso, cycleName, dispatch, i18n, user]
  )
}

export const useLanguage = (): Lang => {
  const { i18n } = useTranslation()

  return useMemo<Lang>(() => i18n.resolvedLanguage as Lang, [i18n.resolvedLanguage])
}
