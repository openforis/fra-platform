import './AreaSelector.scss'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import classNames from 'classnames'

import { ClientRoutes } from '@meta/app'
import { Areas, CountryIso, Global, RegionCode } from '@meta/area'
import { Users } from '@meta/user'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { useIsGeoPage } from '@client/hooks'

import Icon from '../Icon'
import CountryList from './CountryList'

type Props = {
  enableDownload?: boolean
  includeCountries?: boolean
  includeGlobals?: boolean
  includeRegions?: boolean
  onElementSelect?: (countryIso: CountryIso | Global | RegionCode) => void
  placeholder?: string
  selectedValue?: CountryIso | Global | RegionCode
  showCountryFlag?: boolean
  showCountryRole?: boolean
}

const AreaSelector: React.FC<Props> = (props) => {
  const {
    enableDownload,
    includeCountries,
    includeGlobals,
    includeRegions,
    onElementSelect,
    placeholder,
    selectedValue,
    showCountryFlag,
    showCountryRole,
  } = props

  const { t } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const user = useUser()
  const navigate = useNavigate()

  // The user should remain in the maps page when changing countries.
  const isInGeoPage = useIsGeoPage()
  const isCountry = Areas.isISOCountry(selectedValue)

  const destinationPath =
    isInGeoPage && isCountry ? ClientRoutes.Assessment.Cycle.Country.Geo : ClientRoutes.Assessment.Cycle.Country.Landing

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const buttonRef = useRef(null)
  const inputRef = useRef(null)

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value), [])

  const handleClick = useCallback((event: React.MouseEvent<HTMLInputElement>) => event.stopPropagation(), [])

  const defaultHandleElementSelect = (countryIso: CountryIso | Global | RegionCode) => {
    navigate(
      destinationPath.getLink({
        assessmentName: assessment.props.name,
        cycleName: cycle?.name,
        countryIso,
      })
    )
  }

  const handleElementSelect = onElementSelect ?? defaultHandleElementSelect

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
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
    if (inputRef?.current) inputRef.current.focus()
  }, [open])

  return (
    <button
      type="button"
      className="btn-country-select no-print"
      ref={buttonRef}
      onClick={() => setOpen((prevState) => !prevState)}
    >
      <div>
        {open && (
          <input
            type="text"
            className="text-input"
            ref={inputRef}
            onChange={handleChange}
            onClick={handleClick}
            placeholder={t('emoji.picker.search')}
          />
        )}

        {selectedValue && !open && (
          <div className={classNames('toolbar__country', { with_flag: showCountryFlag && isCountry })}>
            {showCountryFlag && isCountry && (
              <div
                className="flag"
                style={{
                  backgroundImage: `url('/img/flags/1x1/${selectedValue}.svg')`,
                }}
              />
            )}
            <div className="name-container">
              <div className="name">{t(Areas.getTranslationKey(selectedValue))}</div>
              {showCountryRole && user && isCountry && (
                <div className="user-role">
                  {t(Users.getI18nRoleLabelKey(Users.getRole(user, selectedValue as CountryIso, cycle)?.role))}
                </div>
              )}
            </div>
          </div>
        )}

        {!selectedValue && !open && (
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
          onElementSelect={handleElementSelect}
          selectedValue={selectedValue}
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
  onElementSelect: null,
  placeholder: null,
  selectedValue: null,
  showCountryFlag: false,
  showCountryRole: false,
}

export default AreaSelector
