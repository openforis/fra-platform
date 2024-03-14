import './Header.scss'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentStatus, CountryIso } from 'meta/area'
import { Routes } from 'meta/routes'

import { useCountry } from 'client/store/area'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
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

  const downloadClassName = useButtonClassName({ iconName, label, noPrint, size })
  const onlyTablesClassName = useButtonClassName({ iconName, inverse: !onlyTables, label, noPrint, size })

  const params = new URLSearchParams({ assessmentName, cycleName, countryIso, onlyTables: String(onlyTables) })
  const downloadHref = `${ApiEndPoint.CycleData.Print.Report.one()}?${params.toString()}`
  const PrintRoute = onlyTables ? Routes.Print : Routes.PrintTables

  const { deskStudy, status } = country?.props ?? {}

  const title = useMemo<string>(() => {
    if (onlyTables) return t(`${assessmentName}.print.titleTables`, { cycleName })
    if (!onlyTables && deskStudy) return `${t(`assessment.${assessmentName}`)} ${t('assessment.deskStudy')}`
    return t(`${assessmentName}.print.title`, { cycleName })
  }, [assessmentName, cycleName, deskStudy, onlyTables, t])

  const withDownload = ![AssessmentStatus.notStarted, AssessmentStatus.editing].includes(status)

  return (
    <div className="print-header">
      <div className="print-header__toolbar">
        {withDownload && (
          <a className={downloadClassName} href={downloadHref} rel="noreferrer" target="_blank">
            <Icon className="icon-white icon-sub" name="hit-down" />
            <Icon className="icon-white icon-sub" name="icon-files" />
          </a>
        )}

        {!onlyTables && (
          <Link
            className={onlyTablesClassName}
            target="_blank"
            to={PrintRoute.generatePath({ assessmentName, cycleName, countryIso })}
          >
            <Icon className="icon-white icon-sub" name="small-print" />
            <Icon className="icon-white icon-sub" name="icon-table2" />
          </Link>
        )}
      </div>

      <h1>{t(`area.${countryIso}.listName`)}</h1>
      <h1>{title}</h1>
    </div>
  )
}

export default Header
