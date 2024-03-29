import './StatusConfirm.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import classNames from 'classnames'

import { AssessmentStatus } from 'meta/area/status'
import { AssessmentName } from 'meta/assessment'
import { Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { AreaActions, useAssessmentCountry } from 'client/store/area'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from 'client/components/Modal'
import UserList from 'client/components/UserList'

import { useRecipients } from './hooks/useRecipients'
import { StatusTransition } from './types'

type Props = {
  onClose: () => void
  status: StatusTransition
}

const StatusConfirm: React.FC<Props> = (props) => {
  const { status, onClose } = props

  const dispatch = useAppDispatch()
  const i18n = useTranslation()
  const countryIso = useCountryIso()
  const user = useUser()
  const country = useAssessmentCountry()

  const [notifyUsers, setNotifyUsers] = useState<boolean>(true)
  const [notifySelf, setNotifySelf] = useState<boolean>(true)

  const [textareaValue, setTextareaValue] = useState<string>('')
  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()

  const recipients = useRecipients({ status })
  const hasRecipients = recipients.length > 0

  return (
    <Modal isOpen>
      <ModalHeader>
        <div className="modal-header-center">{i18n.t(`assessment.status.${status.status}.${status.direction}`)}</div>
        <ModalClose onClose={onClose} />
      </ModalHeader>

      <ModalBody>
        <div style={{ height: '160px' }}>
          <textarea
            className="nav-assessment-status-confirm__message"
            placeholder={i18n.t('navigation.changeStatusTextPlaceholder')}
            value={textareaValue}
            onChange={({ target: { value } }) => setTextareaValue(value)}
          />
        </div>

        {status.status !== AssessmentStatus.approval && Users.isAdministrator(user) && hasRecipients && (
          <div
            className="nav-assessment-status-confirm__notify-users"
            onClick={() => setNotifyUsers(!notifyUsers)}
            onKeyDown={() => setNotifyUsers(!notifyUsers)}
            role="button"
            tabIndex={0}
          >
            <div className={classNames('fra-checkbox', { checked: !notifyUsers })} />
            {i18n.t('navigation.doNotNotifyUsers')}
          </div>
        )}
        {notifyUsers && hasRecipients && <UserList readOnly users={recipients} />}
        <div
          className="nav-assessment-status-confirm__notify-self"
          onClick={() => setNotifySelf(!notifySelf)}
          onKeyDown={() => setNotifySelf(!notifySelf)}
          role="button"
          tabIndex={0}
        >
          <div className={classNames('fra-checkbox', { checked: notifySelf })} />
          {i18n.t('navigation.notifySelf')}
        </div>
      </ModalBody>

      <ModalFooter>
        <button className="btn btn-secondary modal-footer__item" onClick={onClose} type="button">
          {i18n.t('navigation.cancel')}
        </button>
        <button
          className="btn btn-primary modal-footer__item"
          onClick={() => {
            dispatch(
              AreaActions.updateCountry({
                notifyUsers,
                notifySelf,
                country: {
                  ...country,
                  props: {
                    ...country.props,
                    status: status.status,
                  },
                },
                countryIso,
                cycleName,
                assessmentName,
                message: textareaValue,
              })
            )
            onClose()
          }}
          type="button"
        >
          {i18n.t('common.submit')}
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default StatusConfirm
