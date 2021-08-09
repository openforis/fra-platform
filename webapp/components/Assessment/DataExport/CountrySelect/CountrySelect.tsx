import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Areas, Country } from '@core/country'
import { Functions, Strings } from '@core/utils'
import { useI18n, useParamSection } from '@webapp/components/hooks'
import { useAssessmentType } from '@webapp/store/app'
import {
  DataExportAction,
  DataExportSelection,
  useDataExportCountries,
  useDataExportSelection,
} from '@webapp/store/page/dataExport'

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
    const { assessment } = country
    const { deskStudy } = assessment[assessmentType]
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

  useEffect(filterCountries, [countries])

  return (
    <div className="export__form-section export-select-all">
      <div className="export__form-section-header">
        <h4>{i18n.t('admin.country')}</h4>
        <input
          ref={inputRef}
          type="text"
          className="text-input"
          placeholder={i18n.t('emoji.picker.search')}
          onChange={filterCountriesThrottle}
        />
      </div>

      <ButtonCheckBox
        className="btn-all"
        checked={selection.countryISOs.length > 0 && selection.countryISOs.length === countries.length}
        label={selection.countryISOs.length > 0 ? 'common.unselectAll' : 'common.selectAll'}
        onClick={() => {
          const countryISOs: Array<string> =
            selection.countryISOs.length > 0 ? [] : countries.map((country) => country.countryIso)
          dispatch(DataExportAction.updateSelection({ assessmentSection, selection: { ...selection, countryISOs } }))
        }}
      />

      <div className="divider" />

      <div className="export__form-section-variables">
        {countriesFiltered.map((country: Country) => {
          const { countryIso } = country
          const selected = selection.countryISOs.includes(countryIso)

          return (
            <ButtonCheckBox
              key={country.countryIso}
              checked={selected}
              label={Areas.getListName(countryIso, i18n)}
              suffix={getDeskStudyLabel(country)}
              onClick={() => {
                const { countryISOs } = selection

                if (selected) countryISOs.splice(selection.countryISOs.indexOf(countryIso), 1)
                else countryISOs.push(countryIso)

                const selectionUpdate: DataExportSelection = { ...selection, countryISOs }
                dispatch(DataExportAction.updateSelection({ assessmentSection, selection: selectionUpdate }))
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CountrySelect
