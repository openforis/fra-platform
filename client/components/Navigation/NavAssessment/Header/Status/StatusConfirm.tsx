import './StatusConfirm.scss'
import React, { useState } from 'react'

import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from '@client/components/Modal'

// import { useAppDispatch } from '@client/store'
// import { useCountryIso } from '@client/hooks'
import { useTranslation } from 'react-i18next'
import { useUser } from '@client/store/user'
import { Users } from '@meta/user'
// import { useAssessmentCountryStatus } from '@client/store/assessment/hooks'
import { StatusTransition } from './types'

type Props = {
  onClose: () => void
  status: StatusTransition
}

const StatusConfirm: React.FC<Props> = (props) => {
  const { status, onClose } = props

  // const dispatch = useAppDispatch()
  // const countryIso = useCountryIso()
  // const countryStatus = useAssessmentCountryStatus()

  const i18n = useTranslation()
  const user = useUser()
  const [notifyUsers, setNotifyUsers] = useState<boolean>(true)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

        {Users.isAdministrator(user) && (
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
            // TODO
            // const assessmentUpdate = { ...assessment, status: status.status, message: textareaValue }

            // dispatch(CountryActions.changeAssessmentStatus({ countryIso, assessment: assessmentUpdate, notifyUsers }))
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
