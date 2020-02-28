import React from 'react'
import { useSelector } from 'react-redux'
import * as R from 'ramda'

import { isAdministrator } from '@common/countryRole'

import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from '@webapp/components/modal'

import * as AppState from '@webapp/app/appState'

const NavAssessmentStatusConfirm = props => {
  const {
    i18n,
    userInfo,
    assessment,
    targetStatus,
    changeAssessment,
    onClose
  } = props
  const countryIso = useSelector(AppState.getCountryIso)
  const [notifyUsers, setNotifyUsers] = useState(true)
  const [textareaValue, setTextareaValue] = useState('')

  return <Modal isOpen="true">
    <ModalHeader>
      <div className="modal-header-center">
        {i18n.t(`assessment.status.${R.prop('transition', targetStatus)}.${R.prop('direction', targetStatus)}`)}
      </div>
      <ModalClose onClose={onClose} />
    </ModalHeader>

    <ModalBody>
      <div style={{ height: '160px' }}>
        <textarea
          autoFocus
          className="nav__assessment-comment"
          placeholder={i18n.t('navigation.changeStatusTextPlaceholder')}
          onChange={({ target: { value } }) => setTextareaValue(value)}
        />
      </div>

      { //administrator can disable email notification
        isAdministrator(userInfo) &&
        <div className="nav__assessment-notify-users"
             onClick={() => setNotifyUsers(!notifyUsers)}>
          <div className={`fra-checkbox${notifyUsers ? '' : ' checked'}`}></div>
          {i18n.t('navigation.doNotNotifyUsers')}
        </div>
      }
    </ModalBody>

    <ModalFooter>
      <button className="btn btn-secondary modal-footer__item"
              onClick={onClose}>
        {i18n.t('navigation.cancel')}
      </button>
      <button className="btn btn-primary modal-footer__item"
              onClick={() => {
                changeAssessment(
                  countryIso,
                  {
                    ...assessment,
                    status: targetStatus.transition,
                    message: textareaValue
                  },
                  notifyUsers
                )
                onClose()
              }}>
        {i18n.t('navigation.submit')}
      </button>
    </ModalFooter>
  </Modal>
}

export default NavAssessmentStatusConfirm
