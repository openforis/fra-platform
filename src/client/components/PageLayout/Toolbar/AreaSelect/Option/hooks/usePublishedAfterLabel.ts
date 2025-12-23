import { useMemo } from 'react'

import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { Dates } from 'utils/dates'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useUser } from 'client/store/user/hooks/user'
import { useLanguage } from 'client/hooks/language'

type Props = {
  country?: Country
}

type Returned = string | null

export const usePublishedAfterLabel = (props: Props): Returned => {
  const { country } = props
  const assessment = useAssessment()
  const user = useUser()
  const lang = useLanguage()

  return useMemo<Returned>(() => {
    const lastPublished = country?.lastPublishedInfo?.lastPublished
    if (user || !Areas.isPublishedAfterLastPublishedCycle({ assessment, country })) {
      return null
    }

    const date = Dates.parseISO(lastPublished)

    return Dates.format(date, 'MMM-yyyy', { locale: Dates.getLocale(lang) })
  }, [assessment, country, lang, user])
}
