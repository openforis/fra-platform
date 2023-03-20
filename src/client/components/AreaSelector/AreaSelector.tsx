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

type Props = {
  enableDownload?: boolean
  includeCountries?: boolean
  includeGlobals?: boolean
  includeRegions?: boolean
  placeholder?: string
  showCountryFlag?: boolean
  showCountryRole?: boolean
}

const AreaSelector: React.FC<Props> = (props) => {
  const {
    enableDownload,
    includeCountries,
    includeGlobals,
    includeRegions,
    placeholder,
    showCountryFlag,
    showCountryRole,
  } = props

  const countryIso = useCountryIso()
  const cycle = useCycle()
  const user = useUser()

  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  useEffect(() => {
    setQuery('')
  }, [open])

  return (
    <button
      type="button"
      className="btn-country-select no-print"
      ref={ref}
      onClick={() => setOpen((prevState) => !prevState)}
    >
      <div>
        {open && (
          <input
            type="text"
            className="text-input"
            onClick={(event) => event.stopPropagation()}
            placeholder={t('emoji.picker.search')}
            onChange={(event) => setQuery(event.target.value)}
          />
        )}

        {countryIso && !open && (
          <div className="toolbar__country">
            {showCountryFlag && Areas.isISOCountry(countryIso) && (
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
            <div className="toolbar__select-laptop">{placeholder ? `- ${t(placeholder)} -` : ''}</div>
            <div className="toolbar__select-mobile">{placeholder ? `- ${t(placeholder)} -` : ''}</div>
          </>
        )}
      </div>

      <Icon name="small-down" />

      {open && (
        <CountryList
          enableDownload={enableDownload}
          includeCountries={includeCountries}
          includeGlobals={includeGlobals}
          includeRegions={includeRegions}
          showCountryRole={showCountryRole}
          query={query}
        />
      )}
    </button>
  )
}

AreaSelector.defaultProps = {
  enableDownload: false,
  includeGlobals: false,
  includeRegions: false,
  includeCountries: false,
  placeholder: null,
  showCountryFlag: false,
  showCountryRole: false,
}

export default AreaSelector
