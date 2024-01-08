import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Dates } from 'utils/dates'

import { Areas, CountryIso, Global, RegionCode } from 'meta/area'
import { UserRoles } from 'meta/user/userRoles'

import { useCountry } from 'client/store/area'
import { useIsCycleLandingRoute } from 'client/hooks'
import CountryStatusIndicator from 'client/components/CountryStatusIndicator'

type Props = {
  country: { countryIso: CountryIso | Global | RegionCode }
  onElementSelect: (countryIso: CountryIso | Global | RegionCode) => void
  selectedValue: CountryIso | Global | RegionCode
  role: string
}

const CountryListRow: React.FC<Props> = (props: Props) => {
  const {
    role,
    country: { countryIso },
    onElementSelect,
    selectedValue,
  } = props

  const { i18n } = useTranslation()
  const country = useCountry(countryIso as CountryIso)

  const isCycleLanding = useIsCycleLandingRoute()
  const countryNameRef = useRef(null)

  const status = Areas.getStatus(country)
  const selected = selectedValue === countryIso && !isCycleLanding
  const hasRole = role !== UserRoles.noRole.role

  useEffect(() => {
    if (selected) {
      countryNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={classNames('country-selection-list__row', { selected })}
      onClick={(e) => {
        e.preventDefault()
        onElementSelect(countryIso)
      }}
      aria-hidden="true"
    >
      <span className="country-selection-list__primary-col" ref={countryNameRef}>
        {i18n.t<string>(Areas.getTranslationKey(countryIso))}
      </span>

      {hasRole && (
        <>
          <div className="country-selection-list__secondary-col">
            <CountryStatusIndicator status={status} />
          </div>

          <span className="country-selection-list__secondary-col">
            {country?.lastUpdate ? Dates.getRelativeDate(country.lastUpdate, i18n) : '-'}
          </span>
        </>
      )}
    </div>
  )
}

export default CountryListRow
