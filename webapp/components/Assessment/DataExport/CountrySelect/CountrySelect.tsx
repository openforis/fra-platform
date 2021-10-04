import React, { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import MediaQuery from 'react-responsive'

import { Areas, Country } from '@core/country'
import { Functions, Strings } from '@core/utils'
import { useI18n, useParamSection } from '@webapp/hooks'
import { useAssessmentType } from '@webapp/store/app'
import { DataExportAction, useDataExportCountries, useDataExportSelection } from '@webapp/store/page/dataExport'
import { Breakpoints } from '@webapp/utils/breakpoints'

import ButtonCheckBox from '@webapp/components/buttonCheckBox'

const CountrySelect: React.FC = () => {
  const dispatch = useDispatch()
  const i18n = useI18n()
  const assessmentType = useAssessmentType()
  const assessmentSection = useParamSection()
  const countries = useDataExportCountries()
  const selection = useDataExportSelection(assessmentSection)

  const [countriesFiltered, setCountriesFiltered] = useState<Array<Country>>(countries)
  const inputRef = useRef(null)

  const getDeskStudyLabel = useCallback((country: Country): string => {
    const deskStudy = country.assessment[assessmentType]?.deskStudy
    return deskStudy ? i18n.t('assessment.deskStudy') : null
  }, [])

  const filterCountries = useCallback(() => {
    const value = Strings.normalize(inputRef.current.value)
    if (value === '') {
      setCountriesFiltered(countries)
    } else {
      setCountriesFiltered(
        countries.filter((country) => {
          const countryLabel = Areas.getListName(country.countryIso, i18n)
          const searchString = Strings.normalize(`${countryLabel}${getDeskStudyLabel(country)}`)
          return searchString.includes(value)
        })
      )
    }
  }, [countries])

  const filterCountriesThrottle = useCallback(Functions.throttle(filterCountries, 250, { trailing: true }), [countries])

  const updateSelection = (countryISOs: Array<string>): void => {
    dispatch(DataExportAction.updateSelection({ assessmentSection, selection: { ...selection, countryISOs } }))
  }

  return (
    <div className="export__form-section">
      <div className="export__form-section-header select-all search">
        <h4>{i18n.t('admin.country')}</h4>
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
                {Areas.getListName(countryIso, i18n)}
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
                  label={Areas.getListName(countryIso, i18n)}
                  suffix={getDeskStudyLabel(country)}
                  onClick={() => {
                    const { countryISOs } = selection

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
