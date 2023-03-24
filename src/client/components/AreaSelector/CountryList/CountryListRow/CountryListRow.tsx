import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import classNames from 'classnames'

import { ClientRoutes } from '@meta/app'
import { Areas, CountryIso, Global, RegionCode } from '@meta/area'
import { UserRoles } from '@meta/user/userRoles'

import { useAssessment, useCountry, useCycle } from '@client/store/assessment'
import { useCountryIso, useIsCycleLanding, useIsGeoPage } from '@client/hooks'
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
  const isCycleLanding = useIsCycleLanding()
  const countryNameRef = useRef(null)
  const navigate = useNavigate()

  const status = Areas.getStatus(country)
  const selected = countryIso === countryIsoCurrent && !isCycleLanding
  const hasRole = role !== UserRoles.noRole.role

  useEffect(() => {
    if (selected) {
      countryNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // The user should remain in the maps page when changing countries.
  const IsInGeoPage = useIsGeoPage()
  const isCountry = Areas.isISOCountry(countryIso)
  const destinationPath =
    IsInGeoPage && isCountry ? ClientRoutes.Assessment.Cycle.Country.Geo : ClientRoutes.Assessment.Cycle.Country.Landing

  return (
    <div
      className={classNames('country-selection-list__row', { selected })}
      onClick={(e) => {
        e.preventDefault()
        navigate(
          destinationPath.getLink({
            assessmentName: assessment.props.name,
            cycleName: cycle?.name,
            countryIso,
          })
        )
      }}
      aria-hidden="true"
    >
      <span className="country-selection-list__primary-col" ref={countryNameRef}>
        {i18n.t<string>(Areas.getTranslationKey(countryIso))}
      </span>

      {hasRole && (
        <>
          <span className="country-selection-list__secondary-col">
            <div className={`status-${status}`} />
            {i18n.t<string>(`assessment.status.${status}.label`)}
          </span>

          <span className="country-selection-list__secondary-col">
            {country?.lastEdit ? Dates.getRelativeDate(country.lastEdit, i18n) : '-'}
          </span>
        </>
      )}
    </div>
  )
}

export default CountryListRow
