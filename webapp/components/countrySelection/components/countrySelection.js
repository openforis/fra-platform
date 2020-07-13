import './countrySelection.less'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getRoleForCountryLabelKey } from '@common/countryRole'
import { Area } from '@common/country'

import { useCountryIso, useI18n, useNavigationVisible, useUserInfo } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'

import * as CountryState from '@webapp/app/country/countryState'
import { fetchCountryList } from '@webapp/app/country/actions'

import LinkLanding from './linkLanding'
import CountryList from './countryList'
import ToggleNavigationControl from './toggleNavigationControl'

const CountrySelection = () => {
  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const i18n = useI18n()
  const navigationVisible = useNavigationVisible()
  const countriesLoaded = useSelector(CountryState.hasCountries)

  const countrySelectionRef = useRef(null)
  const [open, setOpen] = useState(false)

  const outsideClick = (evt) => {
    if (!countrySelectionRef.current.contains(evt.target)) setOpen(false)
  }

  useEffect(() => {
    if (!countriesLoaded) dispatch(fetchCountryList())

    window.addEventListener('click', outsideClick)

    return () => {
      window.removeEventListener('click', outsideClick)
    }
  }, [])

  return (
    <div className="country-selection">
      {navigationVisible && <LinkLanding />}

      <ToggleNavigationControl />

      <div className="country-selection__select-label">{i18n.t('common.selectArea')}</div>

      <button
        type="button"
        className="btn btn-country-selection no-print"
        ref={countrySelectionRef}
        onClick={() => setOpen(!open)}
        disabled={!countriesLoaded}
      >
        <div>
          {countryIso ? (
            <div className="country-selection__country">
              {Area.isISOCountry(countryIso) && (
                <div
                  className="flag"
                  style={{
                    backgroundImage: `url('/img/flags/1x1/${countryIso}.svg'), url('/img/flags/1x1/ATL.svg')`,
                  }}
                />
              )}

              <div className="name">{i18n.t(`area.${countryIso}.listName`)}</div>
              {userInfo && <div className="user-role">{i18n.t(getRoleForCountryLabelKey(countryIso, userInfo))}</div>}
            </div>
          ) : (
            `- ${i18n.t('common.select')} -`
          )}
        </div>
        <Icon name="small-down" />

        {open && <CountryList />}
      </button>
    </div>
  )
}

export default CountrySelection
