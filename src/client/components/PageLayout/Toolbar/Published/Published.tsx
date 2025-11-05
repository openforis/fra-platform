import './Published.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Dates } from 'utils/dates'

import { Areas } from 'meta/area/areas'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useLastPublishedCycle } from 'client/store/meta/hooks/cycles'
import { useLanguage } from 'client/hooks/language'

const Published: React.FC = () => {
  const { t } = useTranslation()
  const lang = useLanguage()
  const lastPublishedCycle = useLastPublishedCycle()
  const country = useAssessmentCountry()

  const formattedDate = useMemo(() => {
    if (!country?.lastPublishedInfo?.lastPublished) return ''

    const date = Dates.parseISO(country.lastPublishedInfo.lastPublished)
    return Dates.format(date, 'MMMM yyyy', { locale: Dates.getLocale(lang) })
  }, [country?.lastPublishedInfo?.lastPublished, lang])

  const publishedAfter = useMemo(() => {
    if (!country) return false
    return Areas.hasVoluntaryUpdates({ country, cycle: lastPublishedCycle })
  }, [country, lastPublishedCycle])

  if (!country) return null

  return (
    <div className={classNames('toolbar__published_date', { published_after: publishedAfter })}>
      {t('common.lastPublished')} {formattedDate}
    </div>
  )
}

export default Published
