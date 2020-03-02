import './countrySelection.less'

import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { getRoleForCountryLabelKey } from '@common/countryRole'
import * as Country from '@common/country/country'

import Icon from '@webapp/components/icon'
import CountryList from '@webapp/loggedin/countrySelection/components/countryList'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

import * as CountryState from '@webapp/country/countryState'

const CountrySelection = props => {
  const { className } = props

  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const i18n = useI18n()
  const country = useSelector(CountryState.getCountryByCountryIso(countryIso))

  const countrySelectionRef = useRef(null)
  const [open, setOpen] = useState(false)

  const outsideClick = (evt) => {
    if (!countrySelectionRef.current.contains(evt.target))
      setOpen(false)
  }

  useEffect(() => {
    window.addEventListener('click', outsideClick)

    return () => {
      window.removeEventListener('click', outsideClick)
    }
  }, [])

  return (
    <div className={`country-selection no-print ${className}`}
         ref={countrySelectionRef}
         onClick={() => setOpen(!open)}>

      {
        countryIso &&
        <div className="country-selection__flag"
             style={{
               backgroundImage: `url('/img/flags/1x1/${countryIso}.svg'), url('/img/flags/1x1/ATL.svg')`
             }}/>
      }

      <div className="country-selection__info">
        <span className="country-selection__country-name">
          {
            country
              ? Country.getListName(i18n.language)(country)
              : <b>{i18n.t('countrySelection.selectCountry')}</b>
          }
        </span>

        {
          userInfo &&
          <span className="country-selection__user-role">
          {
            i18n.t(getRoleForCountryLabelKey(countryIso, userInfo))
          }
        </span>
        }

      </div>

      <Icon name="small-down"/>

      {
        open &&
        <CountryList/>
      }
    </div>
  )
}

CountrySelection.propTypes = {
  className: PropTypes.string.isRequired
}

export default CountrySelection

