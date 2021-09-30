import './StatusConfirm.scss'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Assessment } from '@core/assessment'
import { Users } from '@core/auth'
import { useCountryIso, useI18n, useUserInfo } from '@webapp/components/hooks'

import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from '@webapp/components/modal'
import { CountryActions } from '@webapp/store/country'
import { StatusTransition } from './types'

type Props = {
  assessment: Assessment
  onClose: () => void
  status: StatusTransition
}

const StatusConfirm: React.FC<Props> = (props) => {
  const { assessment, status, onClose } = props

  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const userInfo = useUserInfo()
  const [notifyUsers, setNotifyUsers] = useState<boolean>(true)
  const [textareaValue, setTextareaValue] = useState<string>('')

  return (
    <Modal isOpen="true">
      <ModalHeader>
        <div className="modal-header-center">{i18n.t(`assessment.status.${status.status}.${status.direction}`)}</div>
        <ModalClose onClose={onClose} />
      </ModalHeader>

      <ModalBody>
        <div style={{ height: '160px' }}>
          <textarea
            className="nav-assessment-status-confirm__message"
            placeholder={i18n.t('navigation.changeStatusTextPlaceholder')}
            onChange={({ target: { value } }) => setTextareaValue(value)}
          />
        </div>

        {Users.isAdministrator(userInfo) && (
          <div
            className="nav-assessment-status-confirm__notify-users"
            onClick={() => setNotifyUsers(!notifyUsers)}
            onKeyDown={() => setNotifyUsers(!notifyUsers)}
            role="button"
            tabIndex={0}
          >
            <div className={`fra-checkbox${notifyUsers ? '' : ' checked'}`} />
            {i18n.t('navigation.doNotNotifyUsers')}
          </div>
        )}
      </ModalBody>

      <ModalFooter>
        <button className="btn btn-secondary modal-footer__item" onClick={onClose} type="button">
          {i18n.t('navigation.cancel')}
        </button>
        <button
          className="btn btn-primary modal-footer__item"
          onClick={() => {
            const assessmentUpdate = { ...assessment, status: status.status, message: textareaValue }
            dispatch(CountryActions.changeAssessmentStatus({ countryIso, assessment: assessmentUpdate, notifyUsers }))
            onClose()
          }}
          type="button"
        >
          {i18n.t('navigation.submit')}
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default StatusConfirm
