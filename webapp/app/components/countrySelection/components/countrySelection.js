import './countrySelection.less'
import React, { useEffect, useRef, useState } from 'react'

import { getRoleForCountryLabelKey } from '@common/countryRole'
import { Area } from '@common/country'

import { useCountryIso, useI18n, useUserInfo } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'

import CountryList from './countryList'
import ToggleNavigationControl from './toggleNavigationControl'

const CountrySelection = () => {
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const i18n = useI18n()

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
        <div>- {i18n.t('common.select')}</div>
        <Icon name="small-down" />
        {open && <CountryList />}
      </button>

      {countryIso && (
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

          {userInfo && (
            <div className="user-role">&nbsp;-&nbsp;{i18n.t(getRoleForCountryLabelKey(countryIso, userInfo))}</div>
          )}
        </div>
      )}
    </div>
  )
}

export default CountrySelection
