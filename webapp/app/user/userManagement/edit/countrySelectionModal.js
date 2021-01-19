import React from 'react'
import * as R from 'ramda'

import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from '@webapp/components/modal'
import { useI18n } from '@webapp/components/hooks'
import { useSecondaryGroupedRegions } from '@webapp/store/app/hooks'

const CountrySelectionModalBody = (props) => {
  const secondaryRegions = useSecondaryGroupedRegions()

  const { countries, toggleCountry, selection, unselectableCountries } = props

  const i18n = useI18n()

  const isSelected = (countryIso) => R.contains(countryIso, selection)
  const isUnselactable = (countryIso) => R.contains(countryIso, unselectableCountries)

  // Sort given countries (from props) to hashmap: {regionCode}: [{countryIso},..]
  const regionCountries = {}

  countries.forEach((country) => {
    const { countryIso, regionCodes } = country
    regionCodes.forEach((regionCode) => {
      if (secondaryRegions.regions.map((r) => r.regionCode).includes(regionCode)) return
      if (!Array.isArray(regionCountries[regionCode])) {
        regionCountries[regionCode] = []
      }
      regionCountries[regionCode].push(countryIso)
    })
  })

  return (
    <ModalBody>
      <div className="edit-user__form-field-country-selection">
        {Object.entries(regionCountries).map(([regionCode, countryIsos]) => (
          <div key={regionCode} className="edit-user__form-field-region-container">
            <div className="edit-user__form-field-region-label">{i18n.t(`area.${regionCode}.listName`)}</div>

            {countryIsos.map((countryIso) => {
              const isCountryUnselectable = isUnselactable(countryIso)
              let classChecked = 'fra-checkbox'
              if (isSelected(countryIso)) classChecked += ' checked'

              let classCountry = 'edit-user__form-field-country-selector'
              if (isCountryUnselectable) classCountry += ' disabled'

              return (
                <div
                  key={countryIso}
                  className={classCountry}
                  onClick={() => !isCountryUnselectable && toggleCountry(countryIso)}
                >
                  <div className={classChecked}></div>
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

const CountrySelectionModal = (props) => {
  const { countries, toggleCountry, onClose, selection, unselectableCountries, headerLabel } = props

  const i18n = useI18n()

  return (
    <div className="country-selection">
      <Modal isOpen>
        <ModalHeader>
          {headerLabel}
          <ModalClose onClose={onClose} />
        </ModalHeader>

        <CountrySelectionModalBody
          countries={countries}
          toggleCountry={toggleCountry}
          selection={selection}
          unselectableCountries={unselectableCountries}
        />

        <ModalFooter>
          <button className="btn btn-primary" onClick={onClose}>
            {i18n.t('editUser.done')}
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default CountrySelectionModal
