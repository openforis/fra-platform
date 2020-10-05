import React, { useEffect } from 'react'
import * as R from 'ramda'

import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from '@webapp/components/modal'
import { useI18n } from '@webapp/components/hooks'
import { useDispatch, useSelector } from 'react-redux'
import * as CountryState from '@webapp/app/country/countryState'
import { fetchRegionList } from '@webapp/app/country/actions'

const CountrySelectionModalBody = (props) => {
  const { countries, toggleCountry, selection, unselectableCountries } = props
  const dispatch = useDispatch()

  const i18n = useI18n()
  const regionsLoaded = useSelector(CountryState.hasRegions)
  const { countryRegions } = useSelector(CountryState.getRegions)

  useEffect(() => {
    if (!regionsLoaded) dispatch(fetchRegionList())
  }, [])

  if (!regionsLoaded) {
    return null
  }

  const isSelected = (countryIso) => R.contains(countryIso, selection)
  const isUnselactable = (countryIso) => R.contains(countryIso, unselectableCountries)

  const countries3 = {}

  countries.forEach((country) => {
    const { countryIso } = country
    const regionCodes = countryRegions[countryIso]

    regionCodes.forEach((regionCode) => {
      if (!Array.isArray(countries3[regionCode])) {
        countries3[regionCode] = []
      }
      countries3[regionCode].push(countryIso)
    })
  })

  return (
    <ModalBody>
      <div className="edit-user__form-field-country-selection">
        {Object.entries(countries3).map(([regionCode, countryIsos]) => (
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
          onClose={onClose}
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
