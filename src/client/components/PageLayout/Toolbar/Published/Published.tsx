import './Published.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { Areas } from 'meta/area/areas'
import { Dates } from 'utils/dates'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useLanguage } from 'client/hooks/language'

const Published: React.FC = () => {
  const { t } = useTranslation()
  const lang = useLanguage()
  const assessment = useAssessment()
  const country = useAssessmentCountry()

  const formattedDate = useMemo(() => {
    if (!country?.lastPublishedInfo?.lastPublished) return ''

    const date = Dates.parseISO(country.lastPublishedInfo.lastPublished)
    return Dates.format(date, 'MMMM yyyy', { locale: Dates.getLocale(lang) })
  }, [country?.lastPublishedInfo?.lastPublished, lang])

  const publishedAfter = useMemo(() => {
    if (!country) return false
    return Areas.hasVoluntaryUpdates({ assessment, country })
  }, [assessment, country])

  if (!country) return null

  return (
    <div className={classNames('toolbar__published_date', { published_after: publishedAfter })}>
      {t('common.lastPublished')} {formattedDate}
    </div>
  )
}

export default Published
