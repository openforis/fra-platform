import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Dates } from 'utils/dates'

import { Areas, CountryIso, Global, RegionCode } from 'meta/area'
import { UserRoles } from 'meta/user/userRoles'

import { useCountry } from 'client/store/area'
import { useIsCycleLandingRoute } from 'client/hooks'
import { useOnMount } from 'client/hooks/useOnMount'
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

  useOnMount(() => {
    if (selected) {
      countryNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }
  })

  return (
    <div
      className={classNames('country-selection-list__row', role, { selected })}
      onClick={(e) => {
        e.preventDefault()
        onElementSelect(countryIso)
      }}
      aria-hidden="true"
    >
      <div ref={countryNameRef}>{i18n.t<string>(Areas.getTranslationKey(countryIso))}</div>

      {hasRole && (
        <>
          <div>
            <CountryStatusIndicator status={status} />
          </div>

          <div>{country?.lastUpdate ? Dates.getRelativeDate(country.lastUpdate, i18n) : '-'}</div>
        </>
      )}
    </div>
  )
}

export default CountryListRow
