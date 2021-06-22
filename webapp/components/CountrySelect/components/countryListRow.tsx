import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Country } from '@common/country'
import { noRole } from '@common/countryRole'
import * as BasePaths from '@webapp/main/basePaths'
import { getRelativeDate } from '@webapp/utils/relativeDate'
import { useIsHome, useCountryIso, useI18n } from '@webapp/components/hooks'

type Props = {
  assessmentType: string
  country: any
  role: string
}
const CountryListRow = (props: Props) => {
  const { assessmentType, role, country } = props
  const hasRole = role !== noRole.role
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const isHome = useIsHome()
  const countryIsoCurrent = Country.getCountryIso(country)
  const fra2020Assessment = Country.getFra2020Assessment(country)
  const countryNameRef = useRef(null)
  const selected = countryIsoCurrent === countryIso && !isHome
  useEffect(() => {
    if (selected) {
      countryNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }
  }, [])
  return (
    <Link
      to={BasePaths.getAssessmentHomeLink(countryIsoCurrent, assessmentType)}
      className={`country-selection-list__row${selected ? ' selected' : ''}`}
    >
      <span className="country-selection-list__primary-col" ref={countryNameRef}>
        {(i18n as any).t(`area.${countryIsoCurrent}.listName`)}
      </span>

      {hasRole && fra2020Assessment && (
        <span className="country-selection-list__secondary-col">
          <div className={`status-${fra2020Assessment}`} />
          {(i18n as any).t(`assessment.status.${fra2020Assessment}.label`)}
        </span>
      )}

      {hasRole && (
        <span className="country-selection-list__secondary-col">
          {getRelativeDate(country.lastEdit, i18n) || (i18n as any).t('audit.notStarted')}
        </span>
      )}
    </Link>
  )
}
export default CountryListRow
