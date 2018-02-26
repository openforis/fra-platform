import React from 'react'
import R from 'ramda'

import {Modal, ModalBody, ModalClose, ModalFooter, ModalHeader} from "../../reusableUiComponents/modal";

import {i18nUserRole} from '../../../common/userUtils'

class CountrySelectionModal extends React.Component {
  render() {
    const {
      i18n,
      role,
      countries,
      userInfo, //session user
      user, //user currently being edited
      getCountryName,
      toggleCountryRole,
      onClose
    } = this.props

    const selection = R.filter(userRole => userRole.role === role, user.roles)
    const isSelected = countryIso => R.pipe(
      R.filter(userRole => userRole.countryIso === countryIso),
      R.isEmpty,
      R.not
    )(selection)

    return <Modal isOpen={true}>
      <ModalHeader>
        {i18nUserRole(i18n, role)}
        <ModalClose onClose={onClose}/>
      </ModalHeader>

      <ModalBody>
        <div className="edit-user__form-field-country-selection">
          {
            countries.map(country => {
              const selected = isSelected(country.countryIso)
              return <div key={country.countryIso}
                          className="edit-user__form-field-country-selector"
                          onClick={() => toggleCountryRole(country.countryIso)}>
                {getCountryName(country.countryIso, userInfo.lang)}
                <div className={`fra-checkbox${selected ? ' checked' : ''}`}></div>
              </div>
            })
          }
        </div>
      </ModalBody>

      <ModalFooter>
        <button className="btn btn-primary" onClick={onClose}>{i18n.t('editUser.done')}</button>
      </ModalFooter>
    </Modal>
  }
}

export default CountrySelectionModal
