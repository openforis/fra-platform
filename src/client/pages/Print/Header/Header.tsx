import './Header.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { Assessments } from 'meta/assessment/assessments'

// import { AssessmentStatus, CountryIso } from 'meta/area'
import { useCountry } from 'client/store/area/hooks/country'
import { useLanguage } from 'client/hooks/language'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useIsPrintRoute } from 'client/hooks/routes'
import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

const iconName = 'hit-down'
const label = 'Label'
const noPrint = false
const size = ButtonSize.m

const Header: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const country = useCountry(countryIso)
  const { onlyTables } = useIsPrintRoute()
  const lang = useLanguage()

  const downloadClassName = useButtonClassName({ iconName, label, noPrint, size })

  const params = new URLSearchParams({ assessmentName, countryIso, cycleName, lang, onlyTables: String(onlyTables) })
  const downloadHref = `${ApiEndPoint.CycleData.Print.Report.one()}?${params.toString()}`

  // const { deskStudy, status } = country?.props ?? {}
  const { deskStudy } = country?.props ?? {}

  const title = useMemo<string>(() => {
    const i18nParams = { assessmentName: t(Assessments.getShortLabel(assessmentName)), cycleName }
    if (onlyTables) return t('print.titleTables', i18nParams)
    if (deskStudy) return `${t(`assessment.${assessmentName}`)} ${t('assessment.deskStudy')}`
    return t('print.title', i18nParams)
  }, [assessmentName, cycleName, deskStudy, onlyTables, t])

  // const withDownload = ![AssessmentStatus.notStarted, AssessmentStatus.editing].includes(status)
  const withDownload = false

  return (
    <div className="print-header">
      <div className="print-header__toolbar">
        {withDownload && (
          <a className={downloadClassName} href={downloadHref} rel="noreferrer" target="_blank">
            <Icon name="hit-down" />
            <Icon name="icon-files" />
          </a>
        )}
      </div>

      <h1>{t(`area.${countryIso}.listName`)}</h1>
      <h1>{title}</h1>
    </div>
  )
}

export default Header
