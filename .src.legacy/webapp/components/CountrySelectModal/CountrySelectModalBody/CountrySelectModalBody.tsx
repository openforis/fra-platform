import './countrySelectModalBody.scss'
import React, { useState } from 'react'

import { Country } from '@core/country'
import { useI18n } from '@webapp/hooks'

import { ModalBody } from '@webapp/components/modal'
import classNames from 'classnames'
import MediaQuery from 'react-responsive'
import { Breakpoints } from '@webapp/utils/breakpoints'

type Props = {
  countries: Array<Country>
  selection: Array<string>
  unselectableCountries: Array<string>
  excludedRegions: Array<string>
  onChange: (countryIso: string) => void
  onChangeAll: (countryISOs: Array<string>) => void
}

const CountrySelectModalBody: React.FC<Props> = (props) => {
  const { countries, onChange, onChangeAll, selection, unselectableCountries, excludedRegions } = props

  const i18n = useI18n()

  const [selectionByRegions, setSelectionByRegions] = useState<Record<string, Array<string>>>(
    countries.reduce<Record<string, Array<string>>>((accumulator, country) => {
      const { countryIso, regionCodes } = country
      regionCodes.forEach((regionCode: string) => {
        const excluded = excludedRegions.includes(regionCode)
        if (!excluded) {
          if (!Array.isArray(accumulator[regionCode])) {
            accumulator[regionCode] = []
          }
          if (selection.includes(countryIso)) {
            accumulator[regionCode].push(countryIso)
          }
        }
      })
      return accumulator
    }, {})
  )

  // Sort given countries (from props) to hashmap: {regionCode}: [{countryIso},..]
  const regionCountries: Record<string, Array<string>> = countries.reduce<Record<string, Array<string>>>(
    (accumulator, country) => {
      const { countryIso, regionCodes } = country
      regionCodes.forEach((regionCode: string) => {
        // We can have excluded regions, ignore these
        const excluded = excludedRegions.includes(regionCode)
        if (!excluded) {
          if (!Array.isArray(accumulator[regionCode])) {
            accumulator[regionCode] = []
          }
          accumulator[regionCode].push(countryIso)
        }
      })
      return accumulator
    },
    {}
  )

  return (
    <ModalBody>
      <div className="modal-country-select-body">
        <MediaQuery maxWidth={Breakpoints.laptop - 1}>
          {Object.entries(regionCountries).map(([regionCode, countryISOs]) => (
            <div key={regionCode}>
              <div>
                <strong>{i18n.t(`area.${regionCode}.listName`)}</strong>
              </div>
              <select
                multiple
                value={selectionByRegions[regionCode]}
                onChange={(event) => {
                  const countryISOs = Array.from(event.target.selectedOptions, (option) => String(option.value))
                  const selectionByRegionsUpdate = { ...selectionByRegions, [regionCode]: countryISOs }
                  const countryISOsAll = Object.values(selectionByRegionsUpdate).flat()
                  onChangeAll(countryISOsAll)
                  setSelectionByRegions(selectionByRegionsUpdate)
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
            <div key={regionCode} className="edit-user__form-field-region-container">
              <div className="edit-user__form-field-region-label">{i18n.t(`area.${regionCode}.listName`)}</div>

              {countryISOs.map((countryIso: string) => {
                const unselectable = unselectableCountries.includes(countryIso)

                return (
                  <div
                    key={countryIso}
                    className={classNames('edit-user__form-field-country-selector', { disabled: unselectable })}
                    onClick={() => onChange(countryIso)}
                    onKeyUp={() => onChange(countryIso)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={classNames('fra-checkbox', { checked: selection.includes(countryIso) })} />
                    <div className="edit-user__form-field-country-label">{i18n.t(`area.${countryIso}.listName`)}</div>
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
