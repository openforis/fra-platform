import React, { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { useParams } from 'react-router-dom'

import { Functions } from 'utils/functions'
import { Strings } from 'utils/strings'

import { Areas, Country } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { DataExportActions, useDataExportCountries, useDataExportSelection } from 'client/store/ui/dataExport'
import { DataExportActionType } from 'client/store/ui/dataExport/actionTypes'
import ButtonCheckBox from 'client/components/ButtonCheckBox'
import { Breakpoints } from 'client/utils/breakpoints'

const CountrySelect: React.FC = () => {
  const dispatch = useAppDispatch()
  const i18n = useTranslation()
  const { sectionName } = useParams<{ sectionName: string }>()
  const countries = useDataExportCountries()
  const selection = useDataExportSelection(sectionName)

  const [countriesFiltered, setCountriesFiltered] = useState<Array<Country>>(countries)
  const inputRef = useRef(null)

  const getDeskStudyLabel = useCallback((country: Country): string => {
    const { deskStudy } = country.props
    return deskStudy ? `(${i18n.t('assessment.deskStudy')})` : null
  }, [])

  const filterCountries = useCallback(() => {
    const value = Strings.normalize(inputRef.current.value)
    if (value === '') {
      setCountriesFiltered(countries)
    } else {
      setCountriesFiltered(
        countries.filter((country) => {
          const countryLabel = i18n.t(Areas.getTranslationKey(country.countryIso))
          const searchString = Strings.normalize(`${countryLabel}${getDeskStudyLabel(country)}`)
          return searchString.includes(value)
        })
      )
    }
  }, [countries])

  const filterCountriesThrottle = useCallback(Functions.throttle(filterCountries, 250, { trailing: true }), [countries])

  const updateSelection = (countryISOs: Array<string>): void => {
    dispatch(
      DataExportActions.updateSelection({
        sectionName,
        selection: { ...selection, countryISOs },
        type: DataExportActionType.selectionUpdate,
      })
    )
  }

  return (
    <div className="export__form-section">
      <div className="export__form-section-header select-all search">
        <h4>{i18n.t('common.country')}</h4>
        <input
          ref={inputRef}
          type="text"
          className="text-input"
          placeholder={i18n.t('emoji.picker.search')}
          onChange={filterCountriesThrottle}
        />
        <ButtonCheckBox
          className="btn-all"
          checked={selection.countryISOs.length > 0 && selection.countryISOs.length === countries.length}
          label={selection.countryISOs.length > 0 ? 'common.unselectAll' : 'common.selectAll'}
          onClick={() => {
            const countryISOs: Array<string> =
              selection.countryISOs.length > 0 ? [] : countries.map((country) => country.countryIso)
            updateSelection(countryISOs)
          }}
        />
      </div>

      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <select
          multiple
          size={5}
          value={selection.countryISOs}
          onChange={(event) => {
            const countryISOsUpdate = Array.from(event.target.selectedOptions, (option) => option.value)
            updateSelection(countryISOsUpdate)
          }}
        >
          {countriesFiltered.map((country: Country) => {
            const { countryIso } = country
            return (
              <option key={countryIso} value={countryIso}>
                {i18n.t(Areas.getTranslationKey(country.countryIso))}
              </option>
            )
          })}
        </select>
      </MediaQuery>

      <MediaQuery minWidth={Breakpoints.laptop}>
        <>
          <div className="divider" />
          <div className="export__form-section-variables">
            {countriesFiltered.map((country: Country) => {
              const { countryIso } = country
              const selected = selection.countryISOs.includes(countryIso)

              return (
                <ButtonCheckBox
                  key={countryIso}
                  checked={selected}
                  label={i18n.t(Areas.getTranslationKey(country.countryIso))}
                  suffix={getDeskStudyLabel(country)}
                  onClick={() => {
                    const countryISOs = [...selection.countryISOs]
                    if (selected) countryISOs.splice(selection.countryISOs.indexOf(countryIso), 1)
                    else countryISOs.push(countryIso)

                    updateSelection(countryISOs)
                  }}
                />
              )
            })}
          </div>
        </>
      </MediaQuery>
    </div>
  )
}

export default CountrySelect
