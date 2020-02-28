import './statusConfirm.less'

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import * as R from 'ramda'

import { isAdministrator } from '@common/countryRole'
import * as CountryStatusAssessment from '@common/country/countryStatusAssessment'

import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from '@webapp/components/modal'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'

import { changeAssessment } from '@webapp/country/actions'

const StatusConfirm = props => {
  const { assessment, targetStatus, onClose } = props

  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const userInfo = useUserInfo()
  const [notifyUsers, setNotifyUsers] = useState(true)
  const [textareaValue, setTextareaValue] = useState('')

  return (
    <Modal isOpen="true">
      <ModalHeader>
        <div className="modal-header-center">
          {i18n.t(`assessment.status.${R.prop('transition', targetStatus)}.${R.prop('direction', targetStatus)}`)}
        </div>
        <ModalClose onClose={onClose}/>
      </ModalHeader>

      <ModalBody>
        <div style={{ height: '160px' }}>
        <textarea
          autoFocus
          className="nav-assessment-status-confirm__message"
          placeholder={i18n.t('navigation.changeStatusTextPlaceholder')}
          onChange={({ target: { value } }) => setTextareaValue(value)}
        />
        </div>

        { //administrator can disable email notification
          isAdministrator(userInfo) &&
          <div className="nav-assessment-status-confirm__notify-users"
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
                  const assessmentUpdate = R.pipe(
                    CountryStatusAssessment.assocStatus(targetStatus.transition),
                    R.assoc('message', textareaValue)
                  )(assessment)
                  dispatch(changeAssessment(countryIso, assessmentUpdate, notifyUsers))
                  onClose()
                }}>
          {i18n.t('navigation.submit')}
        </button>
      </ModalFooter>
    </Modal>
  )
}

StatusConfirm.propTypes = {
  assessment: PropTypes.object.isRequired,
  targetStatus: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default StatusConfirm
