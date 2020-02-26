import './countrySelection.less'

import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { getRoleForCountryLabelKey } from '@common/countryRole'

import Icon from '@webapp/components/icon'
import CountryList from '@webapp/loggedin/countrySelection/components/countryList'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

import { getCountryName } from '@webapp/country/actions'

const CountrySelection = ({ countries }) => {

  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const i18n = useI18n()

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

  const style = {
    backgroundImage: `url('/img/flags/1x1/${countryIso}.svg'), url('/img/flags/1x1/ATL.svg')`
  }

  return (
    <div className="country-selection"
         ref={countrySelectionRef}
         onClick={() => setOpen(!open)}>
      <div className="country-selection__flag" style={style}/>
      <div className="country-selection__info">
        <span className="country-selection__country-name">
          {
            dispatch(getCountryName(countryIso, i18n.language))
          }
        </span>
        <span className="country-selection__user-role">
          {
            i18n.t(getRoleForCountryLabelKey(countryIso, userInfo))
          }
        </span>
      </div>

      <Icon name="small-down"/>

      {
        open &&
        <CountryList
          countries={countries}
        />
      }
    </div>
  )
}

CountrySelection.propTypes = {
  countries: PropTypes.object.isRequired,
}

export default CountrySelection

