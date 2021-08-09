import React from 'react'

import { Country } from '@core/country'
import { useI18n } from '@webapp/components/hooks'

import { ModalBody } from '@webapp/components/modal'
import classNames from 'classnames'

type Props = {
  countries: Array<Country>
  selection: Array<string>
  unselectableCountries: Array<string>
  excludedRegions: Array<string>
  onChange: (countryIso: string) => void
}

const CountrySelectModalBody: React.FC<Props> = (props) => {
  const { countries, onChange, selection, unselectableCountries, excludedRegions } = props

  const i18n = useI18n()

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
      <div className="edit-user__form-field-country-selection">
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
      </div>
    </ModalBody>
  )
}

export default CountrySelectModalBody
