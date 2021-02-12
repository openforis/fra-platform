import React from 'react'
import { useI18n } from '@webapp/components/hooks'
import { ModalBody } from '@webapp/components/modal'
type CountrySelectionModalBodyProps = {
  countries: any[]
  selection: any[]
  unselectableCountries: any[]
  excludedRegions: any[]
  onChange: (...args: any[]) => any
}
const CountrySelectionModalBody: React.SFC<CountrySelectionModalBodyProps> = (props) => {
  const { countries, onChange, selection = [], unselectableCountries, excludedRegions } = props
  const i18n = useI18n()
  // Sort given countries (from props) to hashmap: {regionCode}: [{countryIso},..]
  const regionCountries: any = {}
  countries.forEach((country) => {
    const { countryIso, regionCodes } = country
    regionCodes.forEach((regionCode: string) => {
      // We can have excluded regions, ignore these
      const excluded = excludedRegions.includes(regionCode)
      if (excluded) {
        return
      }
      if (!Array.isArray(regionCountries[regionCode])) {
        regionCountries[regionCode] = []
      }
      regionCountries[regionCode].push(countryIso)
    })
  })
  const _isCountryUnselectable = (countryIso: any) => unselectableCountries.includes(countryIso)
  const _onClick = (countryIso: any) => {
    if (!_isCountryUnselectable(countryIso)) {
      onChange(countryIso)
    }
  }
  return (
    <ModalBody>
      <div className="edit-user__form-field-country-selection">
        {Object.entries(regionCountries).map(([regionCode, countryIsos]: any) => (
          <div key={regionCode} className="edit-user__form-field-region-container">
            <div className="edit-user__form-field-region-label">{i18n.t(`area.${regionCode}.listName`)}</div>

            {countryIsos.map((countryIso: string) => {
              let classChecked = 'fra-checkbox'
              if (selection.includes(countryIso)) classChecked += ' checked'
              let classCountry = 'edit-user__form-field-country-selector'
              if (_isCountryUnselectable(countryIso)) classCountry += ' disabled'
              return (
                <div key={countryIso} className={classCountry} onClick={() => _onClick(countryIso)}>
                  <div className={classChecked} />
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
export default CountrySelectionModalBody
