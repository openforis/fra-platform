/* eslint-disable jsx-a11y/no-autofocus */
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
import { useCountryIso, useIsGeoPage } from '@client/hooks'

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

  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const user = useUser()
  const navigate = useNavigate()

  // The user should remain in the maps page when changing countries.
  const IsInGeoPage = useIsGeoPage()
  const isCountry = Areas.isISOCountry(countryIso)
  const destinationPath =
    IsInGeoPage && isCountry ? ClientRoutes.Assessment.Cycle.Country.Geo : ClientRoutes.Assessment.Cycle.Country.Landing

  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const ref = useRef(null)

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value), [])

  const handleClick = useCallback((event: React.MouseEvent<HTMLInputElement>) => event.stopPropagation(), [])

  const onElementSelect = (countryIso: CountryIso | Global | RegionCode) => {
    navigate(
      destinationPath.getLink({
        assessmentName: assessment.props.name,
        cycleName: cycle?.name,
        countryIso,
      })
    )
  }

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
            onChange={handleChange}
            onClick={handleClick}
            placeholder={t('emoji.picker.search')}
            autoFocus
          />
        )}

        {countryIso && !open && (
          <div className={classNames('toolbar__country', { with_flag: isCountry })}>
            {showCountryFlag && isCountry && (
              <div
                className="flag"
                style={{
                  backgroundImage: `url('/img/flags/1x1/${countryIso}.svg')`,
                }}
              />
            )}
            <div className="name-container">
              <div className="name">{t(Areas.getTranslationKey(countryIso))}</div>
              {user && isCountry && (
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
          onElementSelect={onElementSelect}
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
