import './countrySelection.less'

import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { getRoleForCountryLabelKey } from '@common/countryRole'
import { Area } from '@common/country'

import { useCountryIso, useI18n, useUserInfo } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'
import CountryList from '@webapp/app/components/countrySelection/components/countryList'

import * as CountryState from '@webapp/app/country/countryState'

const CountrySelection = (props) => {
  const { className } = props

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
    <>
      <button
        type="button"
        className={`btn country-selection no-print ${className}`}
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
            {country ? i18n.t(`area.${countryIso}.listName`) : i18n.t('countrySelection.selectCountry')}
          </span>

          {userInfo && country && (
            <span className="country-selection__user-role">
              {i18n.t(getRoleForCountryLabelKey(countryIso, userInfo))}
            </span>
          )}
        </div>

        <Icon name="small-down" />
      </button>
      {open && <CountryList />}
    </>
  )
}

CountrySelection.propTypes = {
  className: PropTypes.string.isRequired,
}

export default CountrySelection
