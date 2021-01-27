import React, { useRef, useState } from 'react'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { isTypePanEuropean } from '@common/assessment/assessment'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { Country } from '@common/country'
import { useI18n, useOnUpdate } from '@webapp/components/hooks'
import ButtonCheckBox from '@webapp/components/buttonCheckBox'
import { useAssessmentType } from '@webapp/store/app'

type Props = {
  countries: string[]
  selectionCountries: string[]
  setSelectionCountries: (...args: any[]) => any
}
const CountrySelect = (props: Props) => {
  const { countries, selectionCountries, setSelectionCountries } = props
  const i18n = useI18n()
  const assessmentType = useAssessmentType()
  const [countriesFiltered, setCountriesFiltered] = useState(countries)
  const inputRef = useRef(null)
  const isDeskStudy = (country: any) => !isTypePanEuropean(assessmentType) && Country.isDeskStudy(country)
  const getDeskStudyValue = (country: any) =>
    isDeskStudy(country) ? ` (${(i18n as any).t('assessment.deskStudy')})` : null
  const normalizeString = (str: any) => str.trim().toLowerCase().replace(/\s/g, '')
  const checkMatch = (country: any, value: any) => {
    const countryLabel = (i18n as any).t(`area.${Country.getCountryIso(country)}.listName`)
    const searchString = normalizeString(`${countryLabel}${getDeskStudyValue(country)}`)
    return searchString.includes(value)
  }
  const updateCountries = () => {
    const value = normalizeString(inputRef.current.value)
    if (value === '') {
      setCountriesFiltered(countries)
    } else {
      setCountriesFiltered(
        countries.filter((country) => {
          return checkMatch(country, value)
        })
      )
    }
  }
  useOnUpdate(updateCountries, [countries])
  return (
    <div className="export__form-section export-select-all">
      <div className="export__form-section-header">
        <h4>{(i18n as any).t('admin.country')}</h4>
        <input
          ref={inputRef}
          type="text"
          className="text-input"
          placeholder={(i18n as any).t('emoji.picker.search')}
          onChange={updateCountries}
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
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'param' does not exist on type 'String'.
          const selected = selectionCountries.filter(({ param }) => param === Country.getCountryIso(country)).length > 0
          return (
            <ButtonCheckBox
              key={Country.getCountryIso(country)}
              checked={selected}
              label={`area.${Country.getCountryIso(country)}.listName`}
              suffix={getDeskStudyValue(country)}
              onClick={() => {
                const selectionCountriesUpdate = selected
                  ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'param' does not exist on type 'String'.
                    selectionCountries.filter(({ param }) => param !== Country.getCountryIso(country))
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
export default CountrySelect
