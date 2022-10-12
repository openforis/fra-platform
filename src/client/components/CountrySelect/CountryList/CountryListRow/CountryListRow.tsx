import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { Areas, CountryIso, Global, RegionCode } from '@meta/area'
import { UserRoles } from '@meta/user/userRoles'

import { useAssessment, useCountry, useCycle } from '@client/store/assessment'
import { useCountryIso, useIsHome } from '@client/hooks'
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

  const status = Areas.getStatus(country)
  const selected = countryIso === countryIsoCurrent && !isHome
  const hasRole = role !== UserRoles.noRole.role

  useEffect(() => {
    if (selected) {
      countryNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Link
      to={ClientRoutes.Assessment.Root.getLink({
        countryIso: countryIso as CountryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle?.name,
      })}
      className={`country-selection-list__row${selected ? ' selected' : ''}`}
    >
      <span className="country-selection-list__primary-col" ref={countryNameRef}>
        {i18n.t<string>(`area.${countryIso}.listName`)}
      </span>

      {hasRole && (
        <>
          <span className="country-selection-list__secondary-col">
            <div className={`status-${status}`} />
            {i18n.t<string>(`assessment.status.${status}.label`)}
          </span>

          <span className="country-selection-list__secondary-col">
            {country.lastEdit ? Dates.getRelativeDate(country.lastEdit, i18n) : i18n.t<string>('audit.notStarted')}
          </span>
        </>
      )}
    </Link>
  )
}

export default CountryListRow
