import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import camelize from 'camelize'

import { useI18n } from '@webapp/components/hooks'
import ButtonCheckBox from '@webapp/components/buttonCheckBox'

const CountrySelect = (props) => {
  const { countries, selectionCountries, setSelectionCountries } = props

  const i18n = useI18n()
  const [countriesFiltered, setCountriesFiltered] = useState(countries)
  const propName = camelize(`list_name_${i18n.language}`)

  useEffect(() => setCountriesFiltered(countries), [countries])

  return (
    <div className="export__form-section export-select-all">
      <div className="export__form-section-header">
        <h4>{i18n.t('admin.country')}</h4>
        <input
          type="text"
          className="text-input"
          placeholder={i18n.t('emoji.picker.search')}
          onChange={(event) => {
            const value = event.target.value.trim().toLowerCase()
            if (value === '') {
              setCountriesFiltered(countries)
            } else {
              setCountriesFiltered(countries.filter((country) => country[propName].toLowerCase().includes(value)))
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
            setSelectionCountries(countries.map((country) => ({ label: country[propName], param: country.countryIso })))
        }}
      />

      <div className="divider" />

      <div className="export__form-section-variables">
        {countriesFiltered.map((country) => {
          const { countryIso } = country
          const selected = selectionCountries.filter(({ param }) => param === country.countryIso).length > 0
          return (
            <ButtonCheckBox
              key={countryIso}
              checked={selected}
              label={country[propName]}
              onClick={() => {
                const selectionCountriesUpdate = selected
                  ? selectionCountries.filter(({ param }) => param !== country.countryIso)
                  : [...selectionCountries, { label: country[propName], param: countryIso }]
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
