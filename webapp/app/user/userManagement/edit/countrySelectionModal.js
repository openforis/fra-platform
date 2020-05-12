import React from 'react'
import * as R from 'ramda'

import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from '@webapp/components/modal'

class CountrySelectionModal extends React.Component {

  render () {
    const {
      i18n,
      countries,
      userInfo, //session user
      getCountryName,
      toggleCountry,
      onClose,
      selection,
      unselectableCountries,
      headerLabel,
    } = this.props

    const countryRegions = R.groupBy(c => c.region, countries)
    const isSelected = countryIso => R.contains(countryIso, selection)
    const isUnselactable = countryIso => R.contains(countryIso, unselectableCountries)

    return <div className="country-selection">
      <Modal isOpen={true}>
        <ModalHeader>
          {headerLabel}
          <ModalClose onClose={onClose}/>
        </ModalHeader>

        <ModalBody>
          <div className="edit-user__form-field-country-selection">
            {
              R.keys(countryRegions)
                .sort((a, b) => i18n.t(`country.region.${a}`) < i18n.t(`country.region.${b}`) ? -1 : 1)
                .map(region =>
                  <div key={region} className="edit-user__form-field-region-container">
                    <div className="edit-user__form-field-region-label">{i18n.t(`country.region.${region}`)}</div>
                    {
                      R.prop(region, countryRegions).map(country => {
                        const selected = isSelected(country.countryIso)
                        const isCountryUnselectable = isUnselactable(country.countryIso)
                        return <div key={country.countryIso}
                                    className={`edit-user__form-field-country-selector${isCountryUnselectable ? ' disabled' : ''}`}
                                    onClick={() => isCountryUnselectable ? null : toggleCountry(country.countryIso)}>
                          <div className={`fra-checkbox${selected ? ' checked' : ''}`}></div>
                          <div className="edit-user__form-field-country-label">
                            {getCountryName(country.countryIso, userInfo.lang)}
                          </div>
                        </div>
                      })
                    }
                  </div>
                )
            }
          </div>
        </ModalBody>

        <ModalFooter>
          <button className="btn btn-primary" onClick={onClose}>{i18n.t('editUser.done')}</button>
        </ModalFooter>

      </Modal>
    </div>
  }
}

export default CountrySelectionModal
