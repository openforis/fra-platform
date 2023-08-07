import { useEffect } from 'react'

import { AssessmentNames } from 'meta/assessment'
import { Lang } from 'meta/lang'
import { User } from 'meta/user'

import { useAssessment } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useLanguage, useUpdateLanguage } from 'client/hooks/useLanguage'
import { useOnMount } from 'client/hooks/useOnMount'
import { Urls } from 'client/utils'

const getLang = (user: User) => {
  return (Urls.getRequestParam('lang') || localStorage.getItem('i18n/lang') || user?.props?.lang || Lang.en) as Lang
}

export const useInitLanguage = (): void => {
  const user = useUser()
  const language = useLanguage()
  const updateLanguage = useUpdateLanguage()
  const assessment = useAssessment()
  const lang = getLang(user)

  useOnMount(() => {
    if (lang !== language) updateLanguage({ lang }).then(() => ({}))
  })

  useEffect(() => {
    // If assessment is panEuropean, we use the english language,
    const params = assessment?.props.name === AssessmentNames.panEuropean ? { lang: Lang.en, persist: false } : { lang }

    updateLanguage(params).then(() => ({}))
  }, [assessment?.props.name, lang, updateLanguage])
}
