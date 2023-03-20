import './AreaSelector.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from '@meta/area'
import { Users } from '@meta/user'

import { useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'

import Icon from '../Icon'
import CountryList from './CountryList'

const findElementRoot = (el: Element): Element => {
  if (el.parentElement === null) return el
  return findElementRoot(el.parentElement)
}

const AreaSelector: React.FC = () => {
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const user = useUser()

  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const countrySelectionRef = useRef(null)

  useEffect(() => {
    setQuery('')
  }, [open])

  const outsideClick = (evt: any) => {
    const elRoot = findElementRoot(evt.target)
    // We need to check these two, since React can unmount the other element before we get here.
    if (
      elRoot.className.includes('toolbar__country') ||
      elRoot.className.includes('toolbar__select-laptop') ||
      elRoot.className.includes('toolbar__select-mobile')
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

  return (
    <button
      type="button"
      className="btn-country-select no-print"
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
            placeholder={t('emoji.picker.search')}
            onChange={(event) => setQuery(event.target.value)}
          />
        )}

        {countryIso && !open && (
          <div className="toolbar__country">
            {Areas.isISOCountry(countryIso) && (
              <div
                className="flag"
                style={{
                  backgroundImage: `url('/img/flags/1x1/${countryIso}.svg')`,
                }}
              />
            )}
            <div className="name-container">
              <div className="name">{t(`area.${countryIso}.listName`)}</div>
              {user && Areas.isISOCountry(countryIso) && (
                <div className="user-role">
                  {t(Users.getI18nRoleLabelKey(Users.getRole(user, countryIso, cycle)?.role))}
                </div>
              )}
            </div>
          </div>
        )}

        {!countryIso && !open && (
          <>
            <div className="toolbar__select-laptop">{`- ${t('common.selectArea')} -`}</div>
            <div className="toolbar__select-mobile">{`- ${t('common.selectArea')} -`}</div>
          </>
        )}
      </div>
      <Icon name="small-down" />

      {open && <CountryList query={query} />}
    </button>
  )
}

export default AreaSelector
