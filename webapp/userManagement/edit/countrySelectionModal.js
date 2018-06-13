import React from 'react'
import R from 'ramda'

import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from '../../reusableUiComponents/modal'

import { i18nUserRole } from '../../../common/userUtils'

class CountrySelectionModal extends React.Component {
  render () {
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

    const countryRegions = R.groupBy(c => c.region, countries)

    const selection = R.filter(userRole => userRole.role === role, user.roles)
    const isSelected = countryIso => R.pipe(
      R.filter(userRole => userRole.countryIso === countryIso),
      R.isEmpty,
      R.not
    )(selection)

    const unselectableCountries = R.pipe(
      R.filter(userRole => userRole.role !== role),
      R.map(R.prop('countryIso'))
    )(user.roles)
    const isUnselactable = countryIso => R.contains(countryIso, unselectableCountries)

    return <Modal isOpen={true}>
      <ModalHeader>
        {i18nUserRole(i18n, role)}
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
                                  onClick={() => isCountryUnselectable ? null : toggleCountryRole(country.countryIso)}>
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
  }
}

export default CountrySelectionModal
