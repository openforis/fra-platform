import { useEffect } from 'react'

import { AssessmentNames } from 'meta/assessment'
import { Lang } from 'meta/lang'

import { useAssessment } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useLanguage, useUpdateLanguage } from 'client/hooks/useLanguage'
import { Urls } from 'client/utils'

export const useInitLanguage = (): void => {
  const user = useUser()
  const language = useLanguage()
  const updateLanguage = useUpdateLanguage()
  const assessment = useAssessment()

  useEffect(() => {
    const langRequestParam = Urls.getRequestParam('lang')
    const langLocalStorage = localStorage.getItem('i18n/lang')
    const langUser = user?.props?.lang

    const lang = (langRequestParam || langLocalStorage || langUser || Lang.en) as Lang

    if (lang !== language) updateLanguage({ lang }).then(() => ({}))
    // If assessment is panEuropean, we use the english language,
    const isPanEuropean = assessment?.props.name === AssessmentNames.panEuropean
    const params = isPanEuropean ? { lang: Lang.en, persist: false } : { lang }
    updateLanguage(params).then(() => ({}))
  }, [assessment?.props.name, language, updateLanguage, user])
}
