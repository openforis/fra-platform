import './StatusConfirm.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import classNames from 'classnames'

import { AssessmentName } from 'meta/assessment'
import { Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { AssessmentActions, useAssessmentCountry } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from 'client/components/Modal'
import { useRecipients } from 'client/components/PageLayout/Toolbar/Status/useRecipients'
import UserList from 'client/components/UserList'

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

  const [textareaValue, setTextareaValue] = useState<string>('')
  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()

  const recipients = useRecipients({ status })

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

        {Users.isAdministrator(user) && (
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
        {notifyUsers && <UserList readOnly isAdmin={false} users={recipients} />}
      </ModalBody>

      <ModalFooter>
        <button className="btn btn-secondary modal-footer__item" onClick={onClose} type="button">
          {i18n.t('navigation.cancel')}
        </button>
        <button
          className="btn btn-primary modal-footer__item"
          onClick={() => {
            dispatch(
              AssessmentActions.updateCountry({
                notifyUsers,
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
                direction: status.direction,
              })
            )
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
