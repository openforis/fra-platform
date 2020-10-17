import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

import { useI18n } from '@webapp/components/hooks'
import ButtonCheckBox from '@webapp/components/buttonCheckBox'

import { isTypePanEuropean } from '@common/assessment/assessment'
import { Country } from '@common/country'

const CountrySelect = (props) => {
  const { countries, selectionCountries, setSelectionCountries } = props

  const i18n = useI18n()
  const { assessmentType } = useParams()
  const [countriesFiltered, setCountriesFiltered] = useState(countries)

  const isDeskStudy = (country) => !isTypePanEuropean(assessmentType) && Country.isDeskStudy(country)
  const getDeskStudyValue = (country) => (isDeskStudy(country) ? ` (${i18n.t('assessment.deskStudy')})` : null)

  const normalizeString = (str) => str.trim().toLowerCase().replace(/\s/g, '')

  const checkMatch = (country, value) => {
    const countryLabel = i18n.t(`area.${Country.getCountryIso(country)}.listName`)
    const searchString = normalizeString(`${countryLabel}${getDeskStudyValue(country)}`)
    return searchString.includes(value)
  }

  return (
    <div className="export__form-section export-select-all">
      <div className="export__form-section-header">
        <h4>{i18n.t('admin.country')}</h4>
        <input
          type="text"
          className="text-input"
          placeholder={i18n.t('emoji.picker.search')}
          onChange={(event) => {
            const value = normalizeString(event.target.value)
            if (value === '') {
              setCountriesFiltered(countries)
            } else {
              setCountriesFiltered(
                countries.filter((country) => {
                  return checkMatch(country, value)
                })
              )
            }
          }}
        />
      </div>

      <ButtonCheckBox
        className="btn-all"
        checked={selectionCountries.length > 0 && selectionCountries.length === countries.length}
        label={selectionCountries.length > 0 ? 'common.unselectAll' : 'common.selectAll'}
        onClick={() => {
          if (selectionCountries.length > 0) setSelectionCountries([])
          else
            setSelectionCountries(
              countries.map((country) => ({
                label: `area.${Country.getCountryIso(country)}.listName`,
                param: Country.getCountryIso(country),
                deskStudy: isDeskStudy(country),
              }))
            )
        }}
      />

      <div className="divider" />

      <div className="export__form-section-variables">
        {countriesFiltered.map((country) => {
          const selected = selectionCountries.filter(({ param }) => param === Country.getCountryIso(country)).length > 0
          return (
            <ButtonCheckBox
              key={Country.getCountryIso(country)}
              checked={selected}
              label={`area.${Country.getCountryIso(country)}.listName`}
              suffix={getDeskStudyValue(country)}
              onClick={() => {
                const selectionCountriesUpdate = selected
                  ? selectionCountries.filter(({ param }) => param !== Country.getCountryIso(country))
                  : [
                      ...selectionCountries,
                      {
                        label: `area.${Country.getCountryIso(country)}.listName`,
                        param: Country.getCountryIso(country),
                        deskStudy: isDeskStudy(country),
                      },
                    ]
                setSelectionCountries(selectionCountriesUpdate)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

CountrySelect.propTypes = {
  countries: PropTypes.arrayOf(String).isRequired,
  selectionCountries: PropTypes.arrayOf(String).isRequired,
  setSelectionCountries: PropTypes.func.isRequired,
}

export default CountrySelect
