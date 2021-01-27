import './countrySelection.less'
import React, { useEffect, useRef, useState } from 'react'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { getRoleForCountryLabelKey } from '@common/countryRole'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { Area } from '@common/country'
import { useCountryIso, useI18n, useNavigationVisible, useUserInfo } from '@webapp/components/hooks'
import Icon from '@webapp/components/icon'
import LinkLanding from './linkLanding'
import CountryList from './countryList'
import ToggleNavigationControl from './toggleNavigationControl'
import AutoSaveStatusText from './autoSaveStatusText'

// @ts-expect-error ts-migrate(7024) FIXME: Function implicitly has return type 'any' because ... Remove this comment to see the full error message
const findElementRoot = (el: any) => {
  if (el.parentElement === null) return el
  return findElementRoot(el.parentElement)
}
const CountrySelection = () => {
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
    if (elRoot.className.includes('country-selection__country')) return
    if (countrySelectionRef.current && countrySelectionRef.current.contains(evt.target)) return
    setOpen(false)
  }
  useEffect(() => {
    window.addEventListener('click', outsideClick)
    return () => {
      window.removeEventListener('click', outsideClick)
    }
  }, [])
  useEffect(() => setQuery(''), [open])
  return (
    <div className="country-selection">
      {navigationVisible && <LinkLanding />}

      <ToggleNavigationControl />

      <div className="country-selection__select-label">{(i18n as any).t('common.selectArea')}</div>

      <button
        type="button"
        className="btn btn-country-selection no-print"
        ref={countrySelectionRef}
        onClick={() => setOpen(!open)}
      >
        <div>
          {open && (
            <input
              type="text"
              className="text-input"
              // eslint-disable-next-line
    autoFocus={true} onClick={(event) => event.stopPropagation()} placeholder={(i18n as any).t('emoji.picker.search')} onChange={(event) => setQuery(event.target.value)}/>)}
          {countryIso && !open && (
            <div className="country-selection__country">
              {Area.isISOCountry(countryIso) && (
                <div
                  className="flag"
                  style={{
                    backgroundImage: `url('/img/flags/1x1/${countryIso}.svg')`,
                  }}
                />
              )}

              <div className="name">{(i18n as any).t(`area.${countryIso}.listName`)}</div>
              {userInfo && (
                <div className="user-role">{(i18n as any).t(getRoleForCountryLabelKey(countryIso, userInfo))}</div>
              )}
            </div>
          )}
          {!countryIso && !open && `- ${(i18n as any).t('common.select')} -`}
        </div>
        <Icon name="small-down" />

        {open && <CountryList query={query} />}
      </button>

      <AutoSaveStatusText />
    </div>
  )
}
export default CountrySelection
