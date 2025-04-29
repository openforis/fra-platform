import './Published.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Dates } from 'utils/dates'

import { Lang } from 'meta/lang'

import { useAssessmentCountry } from 'client/store/area'
import { useLastPublishedCycle } from 'client/store/assessment'

const Published: React.FC = () => {
  const { t, i18n } = useTranslation()
  const lastPublishedCycle = useLastPublishedCycle()
  const country = useAssessmentCountry()

  const formattedDate = useMemo(() => {
    if (!country?.lastPublishedInfo?.lastPublished) return ''

    const date = Dates.parseISO(country.lastPublishedInfo.lastPublished)
    const lang = i18n.language as Lang
    return Dates.format(date, 'MMMM yyyy', { locale: Dates.getLocale(lang) })
  }, [country?.lastPublishedInfo?.lastPublished, i18n.language])

  const publishedAfter = useMemo(() => {
    return Dates.isAfter(
      Dates.parseISO(country?.lastPublishedInfo?.lastPublished),
      Dates.parseISO(lastPublishedCycle.props.datePublished)
    )
  }, [country?.lastPublishedInfo?.lastPublished, lastPublishedCycle.props.datePublished])

  if (!country) return null

  return (
    <div className={classNames('toolbar__published_date', { published_after: publishedAfter })}>
      {t('common.lastPublished')} {formattedDate}
    </div>
  )
}

export default Published
