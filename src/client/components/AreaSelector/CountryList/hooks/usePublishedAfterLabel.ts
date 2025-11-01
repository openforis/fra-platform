import { useMemo } from 'react'

import { Dates } from 'utils/dates'

import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Lang } from 'meta/lang'
import { User } from 'meta/user/user'

type Props = {
  assessment?: Assessment
  country?: Country
  lang: Lang
  user?: User
}

type Returned = string | null

export const usePublishedAfterLabel = (props: Props): Returned => {
  const { assessment, country, lang, user } = props

  return useMemo<Returned>(() => {
    if (user) return null
    if (!Areas.isPublishedAfterLastPublishedCycle({ assessment, country })) return null

    const lastPublished = country?.lastPublishedInfo?.lastPublished
    if (!lastPublished) return null

    const date = Dates.parseISO(lastPublished)

    return Dates.format(date, 'MMM-yyyy', { locale: Dates.getLocale(lang) })
  }, [assessment, country, lang, user])
}
