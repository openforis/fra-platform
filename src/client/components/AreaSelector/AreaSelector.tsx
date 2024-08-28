import './AreaSelector.scss'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import classNames from 'classnames'

import { Areas, CountryIso, Global, RegionCode } from 'meta/area'
import { Routes } from 'meta/routes'
import { Users } from 'meta/user'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useIsGeoRoute } from 'client/hooks'

import Icon from '../Icon'
import CountryList from './CountryList'

type Props = {
  enableDownload?: boolean
  includeCountries?: boolean
  includeRegions?: Array<string>
  onElementSelect?: (countryIso: CountryIso | Global | RegionCode) => void
  placeholder?: string
  selectedValue?: CountryIso | Global | RegionCode
  showCountryFlag?: boolean
  showCountryRole?: boolean
  disabled?: boolean
}

const AreaSelector: React.FC<Props> = (props) => {
  const {
    enableDownload,
    includeCountries,
    includeRegions,
    onElementSelect,
    placeholder,
    selectedValue,
    showCountryFlag,
    showCountryRole,
    disabled,
  } = props

  const { t } = useTranslation()
  const assessment = useAssessment()
  const cycle = useCycle()
  const user = useUser()
  const navigate = useNavigate()

  // The user should remain in the maps page when changing countries.
  const isInGeoPage = useIsGeoRoute()
  const isCountry = Areas.isISOCountry(selectedValue)

  const destinationRoute = isInGeoPage && isCountry ? Routes.Geo : Routes.Country

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const buttonRef = useRef(null)
  const inputRef = useRef(null)

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value), [])

  const handleClick = useCallback((event: React.MouseEvent<HTMLInputElement>) => event.stopPropagation(), [])

  const defaultHandleElementSelect = (countryIso: CountryIso | Global | RegionCode) => {
    navigate(
      destinationRoute.generatePath({
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
      ref={buttonRef}
      className="btn-country-select no-print"
      disabled={disabled}
      onClick={() => setOpen((prevState) => !prevState)}
      type="button"
    >
      <div>
        {open && (
          <input
            ref={inputRef}
            className="text-input"
            onChange={handleChange}
            onClick={handleClick}
            placeholder={t('emoji.picker.search')}
            type="text"
          />
        )}

        {selectedValue && !open && (
          <div className={classNames('toolbar__country', { with_flag: showCountryFlag && isCountry })}>
            {showCountryFlag && isCountry && (
              <div className="flag" style={{ backgroundImage: Areas.getCountryBackgroundImg(selectedValue) }} />
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
          includeRegions={includeRegions}
          onElementSelect={handleElementSelect}
          query={query}
          selectedValue={selectedValue}
          showCountryRole={showCountryRole}
        />
      )}
    </button>
  )
}

AreaSelector.defaultProps = {
  enableDownload: false,
  includeRegions: undefined,
  includeCountries: false,
  onElementSelect: null,
  placeholder: null,
  selectedValue: null,
  showCountryFlag: false,
  showCountryRole: false,
  disabled: false,
}

export default AreaSelector
