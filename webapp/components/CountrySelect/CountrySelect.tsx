import './countrySelect.scss'
import React, { useEffect, useRef, useState } from 'react'
import MediaQuery from 'react-responsive'

import { getRoleForCountryLabelKey } from '@common/countryRole'
import { Areas } from '@core/country'
import { Breakpoints } from '@webapp/utils/breakpoints'

import { useCountryIso, useI18n, useNavigationVisible } from '@webapp/hooks'
import Icon from '@webapp/components/icon'
import LinkHome from '@webapp/components/LinkHome'
import { useUserInfo } from '@webapp/store/user'
import LinkLanding from './LinkLanding'
import CountryList from './CountryList'
import ToggleNavigationControl from './ToggleNavigationControl'
import AutoSaveStatus from './AutoSaveStatus'

const findElementRoot = (el: any): any => {
  if (el.parentElement === null) return el
  return findElementRoot(el.parentElement)
}

const CountrySelect: React.FC = () => {
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const i18n = useI18n()
  const navigationVisible = useNavigationVisible()
  const countrySelectionRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const outsideClick = (evt: any) => {
    const elRoot = findElementRoot(evt.target)
    // We need to check these two, since React can unmount the other element before we get here.
    if (
      elRoot.className.includes('country-select__country') ||
      elRoot.className.includes('country-select__select-laptop') ||
      elRoot.className.includes('country-select__select-mobile')
    )
      return
    if (countrySelectionRef.current && countrySelectionRef.current.contains(evt.target)) return

    setOpen(false)
  }

  useEffect(() => {
    window.addEventListener('click', outsideClick)
    return () => {
      window.removeEventListener('click', outsideClick)
    }
  }, [])

  useEffect(() => {
    setQuery('')
  }, [open])

  return (
    <div className="country-select">
      {navigationVisible && (
        <MediaQuery minWidth={Breakpoints.laptop}>
          <LinkLanding />
        </MediaQuery>
      )}

      <ToggleNavigationControl />

      <div className="country-select__select-label">{i18n.t('common.selectArea')}</div>

      <button
        type="button"
        className="btn btn-country-select no-print"
        ref={countrySelectionRef}
        onClick={() => setOpen((prevState) => !prevState)}
      >
        <div>
          {open && (
            <input
              type="text"
              className="text-input"
              // eslint-disable-next-line
              autoFocus
              onClick={(event) => event.stopPropagation()}
              placeholder={i18n.t('emoji.picker.search')}
              onChange={(event) => setQuery(event.target.value)}
            />
          )}

          {countryIso && !open && (
            <div className="country-select__country">
              {Areas.isISOCountry(countryIso) && (
                <div
                  className="flag"
                  style={{
                    backgroundImage: `url('/img/flags/1x1/${countryIso}.svg')`,
                  }}
                />
              )}

              <div className="name">{i18n.t(`area.${countryIso}.listName`)}</div>
              {userInfo && <div className="user-role">{i18n.t(getRoleForCountryLabelKey(countryIso, userInfo))}</div>}
            </div>
          )}

          {!countryIso && !open && (
            <>
              <div className="country-select__select-laptop">- {i18n.t('common.select')} -</div>
              <div className="country-select__select-mobile">{i18n.t('common.selectArea')}</div>
            </>
          )}
        </div>
        <Icon name="small-down" />

        {open && <CountryList query={query} />}
      </button>

      <AutoSaveStatus />

      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <LinkHome />
      </MediaQuery>
    </div>
  )
}
export default CountrySelect
