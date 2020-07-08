import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import camelize from 'camelize'

import { useCountryIso, useI18n } from '@webapp/components/hooks'
import ButtonCheckBox from '@webapp/components/buttonCheckBox'
import { useParams } from 'react-router'
import { isTypePanEuropean } from '@common/assessment/assessment'
import { Area, Country } from '@common/country'

const CountrySelect = (props) => {
  const { countries, selectionCountries, setSelectionCountries } = props
  const { assessmentType } = useParams()

  const i18n = useI18n()
  const countryIso = useCountryIso()

  const [countriesFiltered, setCountriesFiltered] = useState(countries)
  const propName = camelize(`list_name_${i18n.language}`)

  const isDeskStudy = (country) => !isTypePanEuropean(assessmentType) && country.assessment.fra2020.deskStudy
  const getDeskStudyValue = (country) => (isDeskStudy(country) ? ` (${i18n.t('assessment.deskStudy')})` : null)

  const normalizeString = (str) => str.trim().toLowerCase().replace(/\s/g, '')
  const checkMatch = (country, value) =>
    normalizeString(`${country[propName]}${getDeskStudyValue(country)}`).includes(value)

  useEffect(
    () =>
      setCountriesFiltered(
        Area.isISORegion(countryIso) ? countries.filter((country) => country.regionIso === countryIso) : countries
      ),
    [countries]
  )

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
