import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { noRole } from '@common/countryRole'

import { CountryIso, Global, RegionCode } from '@meta/area'

import { useAssessment, useCountry, useCycle } from '@client/store/assessment'
import { useCountryIso, useIsHome } from '@client/hooks'
import { BasePaths } from '@client/basePaths'
import { Dates } from '@client/utils'

type Props = {
  country: { countryIso: CountryIso | Global | RegionCode }
  role: string
}

const CountryListRow: React.FC<Props> = (props: Props) => {
  const {
    role,
    country: { countryIso },
  } = props

  const { i18n } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const country = useCountry(countryIso as CountryIso)
  const countryIsoCurrent = useCountryIso()
  const isHome = useIsHome()
  const countryNameRef = useRef(null)

  const status = country?.props?.status ?? 'editing'
  const selected = countryIso === countryIsoCurrent && !isHome
  const hasRole = role !== noRole.role

  useEffect(() => {
    if (selected) {
      countryNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }
  }, [])

  return (
    <Link
      to={BasePaths.Assessment.root(countryIso, assessment.props.name, cycle?.name)}
      className={`country-selection-list__row${selected ? ' selected' : ''}`}
    >
      <span className="country-selection-list__primary-col" ref={countryNameRef}>
        {i18n.t(`area.${countryIso}.listName`)}
      </span>

      {hasRole && (
        <>
          <span className="country-selection-list__secondary-col">
            <div className={`status-${status}`} />
            {i18n.t(`assessment.status.${status}.label`)}
          </span>

          <span className="country-selection-list__secondary-col">
            {country.lastEdit ? Dates.getRelativeDate(country.lastEdit, i18n) : i18n.t('audit.notStarted')}
          </span>
        </>
      )}
    </Link>
  )
}

export default CountryListRow
