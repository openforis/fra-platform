import React, { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { useParams } from 'react-router'

import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { Users } from 'meta/user/users'
import { Functions } from 'utils/functions'
import { Strings } from 'utils/strings'

import { DataExportActions } from 'client/store/dataExport/actions'
import { useDataExportCountries, useDataExportSelection } from 'client/store/dataExport/hooks/dataExport'
import { useAppDispatch } from 'client/store/hooks'
import { useUser } from 'client/store/user/hooks/user'
import ButtonCheckBox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
import CountryMultiSelect from 'client/components/CountryMultiSelect'
import InputText from 'client/components/Inputs/InputText'
import { Breakpoints } from 'client/utils/breakpoints'

const CountrySelect: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { sectionName } = useParams<{ sectionName: string }>()
  const countries = useDataExportCountries()
  const selection = useDataExportSelection(sectionName)
  const user = useUser()

  const [countriesFiltered, setCountriesFiltered] = useState<Array<Country>>(countries)
  const inputRef = useRef(null)

  const getDeskStudyLabel = useCallback(
    (country: Country): string => {
      const { deskStudy } = country.props
      return deskStudy ? `(${t('assessment.deskStudy')})` : ''
    },
    [t]
  )

  const filterCountries = useCallback(() => {
    const value = Strings.normalize(inputRef.current.value)
    if (value === '') {
      setCountriesFiltered(countries)
    } else {
      setCountriesFiltered(
        countries.filter((country) => {
          const countryLabel = t(Areas.getTranslationKey(country.countryIso))
          const searchString = Strings.normalize(`${countryLabel}${getDeskStudyLabel(country)}`)
          return searchString.includes(value)
        })
      )
    }
  }, [countries, getDeskStudyLabel, t])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterCountriesThrottle = useCallback(Functions.throttle(filterCountries, 250, { trailing: true }), [countries])

  const updateSelection = (countryISOs: Array<string>): void => {
    dispatch(
      DataExportActions.updateSelection({
        sectionName,
        selection: { ...selection, countryISOs },
      })
    )
  }

  return (
    <div className="export__form-section">
      <div className="export__form-section-header select-all search">
        <div className="title-container">
          <h4>{t('common.countries')}</h4>
        </div>
        <MediaQuery minWidth={Breakpoints.laptop}>
          <InputText
            ref={inputRef}
            bordered
            onChange={filterCountriesThrottle}
            placeholder={t('emoji.picker.search')}
          />
          <ButtonCheckBox
            checked={selection.countryISOs.length > 0 && selection.countryISOs.length === countries.length}
            className="btn-all"
            label={t(selection.countryISOs.length > 0 ? 'common.unselectAll' : 'common.selectAll')}
            onClick={(): void => {
              const countryISOs: Array<string> =
                selection.countryISOs.length > 0 ? [] : countries.map((country) => country.countryIso)
              updateSelection(countryISOs)
            }}
            variant={ButtonCheckboxVariant.checkbox}
          />
        </MediaQuery>
      </div>

      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <CountryMultiSelect
          allowAtlantis={user && Users.isAdministrator(user)}
          allowedCountries={countriesFiltered.map((c) => c.countryIso)}
          onChange={updateSelection}
          value={selection.countryISOs as Array<CountryIso>}
        />
      </MediaQuery>

      <MediaQuery minWidth={Breakpoints.laptop}>
        <>
          <div className="divider" />
          <div className="export__form-section-variables">
            {countriesFiltered.map((country: Country) => {
              const { countryIso } = country
              const selected = selection.countryISOs.includes(countryIso)
              const label = `${t(Areas.getTranslationKey(country.countryIso))} ${getDeskStudyLabel(country)}`
              return (
                <ButtonCheckBox
                  key={countryIso}
                  checked={selected}
                  label={label}
                  onClick={(): void => {
                    const countryISOs = [...selection.countryISOs]
                    if (selected) countryISOs.splice(selection.countryISOs.indexOf(countryIso), 1)
                    else countryISOs.push(countryIso)

                    updateSelection(countryISOs)
                  }}
                  variant={ButtonCheckboxVariant.checkbox}
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
