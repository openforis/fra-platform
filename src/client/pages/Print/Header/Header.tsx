import './Header.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
// import { AssessmentStatus, CountryIso } from 'meta/area'
import { CountryIso } from 'meta/area'

import { useCountry } from 'client/store/area'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { useLanguage } from 'client/hooks/useLanguage'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

const iconName = 'hit-down'
const label = 'Label'
const noPrint = false
const size = ButtonSize.m

const Header: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const country = useCountry(countryIso)
  const { onlyTables } = useIsPrintRoute()
  const lang = useLanguage()

  const downloadClassName = useButtonClassName({ iconName, label, noPrint, size })

  const params = new URLSearchParams({ assessmentName, countryIso, cycleName, lang, onlyTables: String(onlyTables) })
  const downloadHref = `${ApiEndPoint.CycleData.Print.Report.one()}?${params.toString()}`

  // const { deskStudy, status } = country?.props ?? {}
  const { deskStudy } = country?.props ?? {}

  const title = useMemo<string>(() => {
    if (onlyTables) return t(`${assessmentName}.print.titleTables`, { cycleName })
    if (deskStudy) return `${t(`assessment.${assessmentName}`)} ${t('assessment.deskStudy')}`
    return t(`${assessmentName}.print.title`, { cycleName })
  }, [assessmentName, cycleName, deskStudy, onlyTables, t])

  // const withDownload = ![AssessmentStatus.notStarted, AssessmentStatus.editing].includes(status)
  const withDownload = false

  return (
    <div className="print-header">
      <div className="print-header__toolbar">
        {withDownload && (
          <a className={downloadClassName} href={downloadHref} rel="noreferrer" target="_blank">
            <Icon className="icon-white icon-sub" name="hit-down" />
            <Icon className="icon-white icon-sub" name="icon-files" />
          </a>
        )}
      </div>

      <h1>{t(`area.${countryIso}.listName`)}</h1>
      <h1>{title}</h1>
    </div>
  )
}

export default Header
