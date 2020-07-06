import './countrySelection.less'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { getRoleForCountryLabelKey } from '@common/countryRole'
import { Area } from '@common/country'

import * as CountryState from '@webapp/app/country/countryState'

import { useCountryIso, useI18n, useUserInfo } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'

import CountryList from './countryList'
import ToggleNavigationControl from './toggleNavigationControl'

const CountrySelection = () => {
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const i18n = useI18n()
  const country = useSelector(CountryState.getCountryByCountryIso(countryIso))

  const countrySelectionRef = useRef(null)
  const [open, setOpen] = useState(false)

  const outsideClick = (evt) => {
    if (!countrySelectionRef.current.contains(evt.target)) setOpen(false)
  }

  useEffect(() => {
    window.addEventListener('click', outsideClick)

    return () => {
      window.removeEventListener('click', outsideClick)
    }
  }, [])

  return (
    <div className="country-selection">
      <ToggleNavigationControl />

      <div className="country-selection__select-label">{i18n.t('common.selectArea')}</div>

      <button
        type="button"
        className="btn btn-country-selection no-print"
        ref={countrySelectionRef}
        onClick={() => setOpen(!open)}
      >
        {countryIso && Area.isISOCountry(countryIso) && (
          <div
            className="country-selection__flag"
            style={{
              backgroundImage: `url('/img/flags/1x1/${countryIso}.svg'), url('/img/flags/1x1/ATL.svg')`,
            }}
          />
        )}

        <div className="country-selection__info">
          <span className="country-selection__country-name">
            {countryIso ? i18n.t(`area.${countryIso}.listName`) : `- ${i18n.t('common.select')} -`}
          </span>

          {userInfo && country && (
            <span className="country-selection__user-role">
              {` - ${i18n.t(getRoleForCountryLabelKey(countryIso, userInfo))}`}
            </span>
          )}
        </div>

        <Icon name="small-down" />

        {open && <CountryList />}
      </button>
    </div>
  )
}

export default CountrySelection
