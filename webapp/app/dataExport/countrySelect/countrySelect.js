import './countrySelect.less'
import React from 'react'
import PropTypes from 'prop-types'
import camelize from 'camelize'

import { useI18n } from '@webapp/components/hooks'

const CountrySelect = (props) => {
  const { countries, selectionCountries, setSelectionCountries } = props
  const i18n = useI18n()
  const propName = camelize(`list_name_${i18n.language}`)

  return (
    <div className="export-country-select">
      <div className="export-country-select__header">
        <h4>{i18n.t('admin.country')}</h4>
        <input type="text" className="text-input" />
      </div>

      <div className="export-country-select__countries">
        {countries.map((country) => {
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
              <div className={`fra-checkbox ${selected ? 'checked' : ''}`} />
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
