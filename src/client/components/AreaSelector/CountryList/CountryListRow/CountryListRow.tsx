import React, { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Dates } from 'utils/dates'
import { Objects } from 'utils/objects'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { Global } from 'meta/area/global'
import { RegionCode } from 'meta/area/regionCode'
import { UserRoles } from 'meta/user/roles'

import { useCountry } from 'client/store/area/hooks/country'
import { useIsAreaSelectorExpanded } from 'client/store/ui/areaSelector/hooks/areaSelector'
import { useOnMount } from 'client/hooks/onMount'
import { useIsCycleLandingRoute } from 'client/hooks/routes'
import { usePublishedAfterLabel } from 'client/components/AreaSelector/CountryList/CountryListRow/hooks/usePublishedAfterLabel'
import CountryStatusIndicator from 'client/components/CountryStatusIndicator'

type Props = {
  country: { countryIso: CountryIso | Global | RegionCode }
  onElementSelect: (countryIso: CountryIso | Global | RegionCode) => void
  selectedValue: CountryIso | Global | RegionCode
  role: string
}

const CountryListRow: React.FC<Props> = (props: Props) => {
  const {
    country: { countryIso },
    onElementSelect,
    role,
    selectedValue,
  } = props

  const { i18n } = useTranslation()
  const country = useCountry(countryIso as CountryIso)
  const isCycleLanding = useIsCycleLandingRoute()
  const expanded = useIsAreaSelectorExpanded()

  const countryNameRef = useRef(null)

  const status = Areas.getStatus(country)
  const selected = selectedValue === countryIso && !isCycleLanding
  const hasRole = role !== UserRoles.noRole.role

  const formatDate = useCallback((date?: string): string => (date ? Dates.getRelativeDate(date, i18n) : '-'), [i18n])

  const lastPublishedLabel = usePublishedAfterLabel({ country })

  useOnMount(() => {
    if (selected) {
      countryNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }
  })

  return (
    <div
      aria-hidden="true"
      className={classNames('country-selection-list__row', role, {
        expanded,
        hasLastPublishedLabel: Boolean(lastPublishedLabel),
        selected,
      })}
      onClick={(e): void => {
        e.preventDefault()
        onElementSelect(countryIso)
      }}
    >
      <div ref={countryNameRef}>{i18n.t<string>(Areas.getTranslationKey(countryIso))}</div>
      {lastPublishedLabel && <div>{lastPublishedLabel}</div>}

      {hasRole && !Objects.isEmpty(country) && (
        <>
          <div>
            <CountryStatusIndicator status={status} />
          </div>

          {!expanded && <div>{formatDate(country.lastUpdate)}</div>}
          {expanded && (
            <>
              <div>{formatDate(country.lastEdit)}</div>
              <div>{formatDate(country.lastInReview)}</div>
              <div>{formatDate(country.lastInApproval)}</div>
              <div>{formatDate(country.lastInAccepted)}</div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default CountryListRow
