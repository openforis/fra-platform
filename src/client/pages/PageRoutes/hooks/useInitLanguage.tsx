import { useEffect } from 'react'

import { AssessmentNames } from 'meta/assessment'
import { Lang } from 'meta/lang'

import { useAssessment } from 'client/store/assessment'
import { useLanguage, useUpdateLanguage } from 'client/hooks/useLanguage'
import { useOnMount } from 'client/hooks/useOnMount'
import { Urls } from 'client/utils'

export const useInitLanguage = (): void => {
  const language = useLanguage()
  const updateLanguage = useUpdateLanguage()
  const assessment = useAssessment()

  useOnMount(() => {
    const lang = (Urls.getRequestParam('lang') || localStorage.getItem('i18n/lang') || Lang.en) as Lang
    if (lang !== language) updateLanguage({ lang }).then(() => ({}))
  })

  useEffect(() => {
    // If assessment is panEuropean, we use the english language,
    const params =
      assessment?.props.name === AssessmentNames.panEuropean
        ? { lang: Lang.en, persist: false }
        : { lang: localStorage.getItem('i18n/lang') as Lang }
    updateLanguage(params).then(() => ({}))
  }, [assessment?.props.name, updateLanguage])
}
