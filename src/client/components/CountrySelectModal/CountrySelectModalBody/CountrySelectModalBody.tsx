import './countrySelectModalBody.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'

import classNames from 'classnames'

import { Country } from 'meta/area'

import { ModalBody } from 'client/components/Modal'
import { Breakpoints } from 'client/utils/breakpoints'

type Props = {
  countries: Array<Country>
  selection: Array<string>
  unselectableCountries: Array<string>
  excludedRegions: Array<string>
  onChange: (countryIso: string) => void
  onChangeAll: (countryISOs: Array<string>) => void
  onChangeMany: (countryISOs: Array<string>, selectAll: boolean) => void
}

const CountrySelectModalBody: React.FC<Props> = (props) => {
  const { countries, onChange, onChangeAll, onChangeMany, selection, unselectableCountries, excludedRegions } = props
  const allSelectedInRegion = useCallback(
    (region: string[], selection: string[]) => region.every((v) => selection.includes(v) || unselectableCountries.includes(v)),
    [unselectableCountries]
  )

  const allRegionCountriesDisabled = useCallback(
    (countryISOs: string[]) => countryISOs.every((countryIso) => unselectableCountries.includes(countryIso)),
    [unselectableCountries]
  )

  const i18n = useTranslation()

  // Sort given countries (from props) to hashmap: {regionCode}: [{countryIso},..]
  const regionCountries: Record<string, Array<string>> = countries.reduce<Record<string, Array<string>>>((accumulator, country) => {
    const { countryIso, regionCodes } = country
    regionCodes.forEach((regionCode: string) => {
      // We can have excluded regions, ignore these
      const excluded = excludedRegions.includes(regionCode)
      if (!excluded) {
        if (!Array.isArray(accumulator[regionCode])) {
          // eslint-disable-next-line no-param-reassign
          accumulator[regionCode] = []
        }
        accumulator[regionCode].push(countryIso)
      }
    })
    return accumulator
  }, {})

  return (
    <ModalBody>
      <div className="modal-country-select-body">
        <MediaQuery maxWidth={Breakpoints.laptop - 1}>
          {Object.entries(regionCountries).map(([regionCode, countryISOs]) => (
            <div key={regionCode}>
              <div
                className={classNames('form-field-country-selector', {
                  disabled: allRegionCountriesDisabled(countryISOs),
                })}
                onClick={() => {
                  const newSelection = allSelectedInRegion(countryISOs, selection)
                    ? selection.filter((countryIso) => !countryISOs.includes(countryIso))
                    : countryISOs.concat(selection)
                  onChangeAll(newSelection.filter((c) => !unselectableCountries.includes(c)))
                }}
                onKeyUp={() => {
                  const newSelection = allSelectedInRegion(countryISOs, selection)
                    ? selection.filter((countryIso) => !countryISOs.includes(countryIso))
                    : countryISOs.concat(selection)
                  onChangeAll(newSelection.filter((c) => !unselectableCountries.includes(c)))
                }}
                role="button"
                tabIndex={0}
              >
                <div
                  className={classNames('fra-checkbox', {
                    checked: allSelectedInRegion(countryISOs, selection) && !allRegionCountriesDisabled(countryISOs),
                    disabled: countryISOs.every((countryIso) => unselectableCountries.includes(countryIso)),
                  })}
                />
                <strong>{i18n.t(`area.${regionCode}.listName`)}</strong>
              </div>
              <select
                multiple
                value={countryISOs.filter((countryIso) => selection.includes(countryIso))}
                onChange={(event) => {
                  const currentSelection = Array.from(event.target.selectedOptions, (option) => String(option.value))
                  onChangeAll(selection.filter((countryIso) => !countryISOs.includes(countryIso)).concat(currentSelection))
                }}
              >
                {countryISOs.map((countryIso: string) => {
                  const unselectable = unselectableCountries.includes(countryIso)
                  return (
                    <option key={countryIso} disabled={unselectable} value={countryIso}>
                      {i18n.t(`area.${countryIso}.listName`)}
                    </option>
                  )
                })}
              </select>
            </div>
          ))}
        </MediaQuery>

        <MediaQuery minWidth={Breakpoints.laptop}>
          {Object.entries(regionCountries).map(([regionCode, countryISOs]) => (
            <div key={regionCode} className="form-field-region-container">
              <div
                className={classNames('form-field-country-selector', {
                  disabled: allRegionCountriesDisabled(countryISOs),
                })}
                onClick={() => onChangeMany(countryISOs, !allSelectedInRegion(countryISOs, selection))}
                onKeyUp={() => onChangeMany(countryISOs, !allSelectedInRegion(countryISOs, selection))}
                role="button"
                tabIndex={0}
              >
                <div
                  className={classNames('fra-checkbox', {
                    checked: allSelectedInRegion(countryISOs, selection) && !allRegionCountriesDisabled(countryISOs),
                  })}
                />
                <div className="form-field-region-label">{i18n.t(`area.${regionCode}.listName`)}</div>
              </div>

              <hr />

              {countryISOs.map((countryIso: string) => {
                const unselectable = unselectableCountries.includes(countryIso)

                return (
                  <div
                    key={countryIso}
                    className={classNames('form-field-country-selector', { disabled: unselectable })}
                    onClick={() => onChange(countryIso)}
                    onKeyUp={() => onChange(countryIso)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={classNames('fra-checkbox', { checked: selection.includes(countryIso) })} />
                    <div className="form-field-country-label">{i18n.t(`area.${countryIso}.listName`)}</div>
                  </div>
                )
              })}
            </div>
          ))}
        </MediaQuery>
      </div>
    </ModalBody>
  )
}

export default CountrySelectModalBody
