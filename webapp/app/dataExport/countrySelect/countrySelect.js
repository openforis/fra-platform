import './countrySelect.less'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import camelize from 'camelize'

import { useI18n } from '@webapp/components/hooks'

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
            const value = event.target.value.trim().toLocaleLowerCase()
            if (value === '') {
              setCountriesFiltered(countries)
            } else {
              setCountriesFiltered(countries.filter((country) => country[propName].toLowerCase().includes(value)))
            }
          }}
        />
      </div>

      <div className="export-country-select__countries">
        {countriesFiltered.map((country) => {
          const { countryIso } = country
          const selected = selectionCountries.includes(countryIso)
          return (
            <button
              type="button"
              className="btn-s btn-country"
              key={countryIso}
              onClick={() => {
                if (selected) {
                  const selectionCountriesUpdate = [...selectionCountries]
                  selectionCountriesUpdate.splice(selectionCountriesUpdate.indexOf(countryIso), 1)
                  setSelectionCountries(selectionCountriesUpdate)
                } else {
                  setSelectionCountries([...selectionCountries, countryIso])
                }
              }}
            >
              <div className={`fra-checkbox${selected ? ' checked' : ''}`} />
              <div>{country[propName]}</div>
            </button>
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
