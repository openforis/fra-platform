import './countrySelect.less'
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
    <div className="export-country-select">
      <div className="export-country-select__header">
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
          else setSelectionCountries(countries.map((country) => country.countryIso))
        }}
      />

      <div className="divider" />

      <div className="export-country-select__countries">
        {countriesFiltered.map((country) => {
          const { countryIso } = country
          const selected = selectionCountries.includes(countryIso)
          return (
            <ButtonCheckBox
              key={countryIso}
              checked={selected}
              label={country[propName]}
              onClick={() => {
                if (selected) {
                  const selectionCountriesUpdate = [...selectionCountries]
                  selectionCountriesUpdate.splice(selectionCountriesUpdate.indexOf(countryIso), 1)
                  setSelectionCountries(selectionCountriesUpdate)
                } else {
                  setSelectionCountries([...selectionCountries, countryIso])
                }
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
