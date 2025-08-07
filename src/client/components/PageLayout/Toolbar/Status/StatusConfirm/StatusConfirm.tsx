import './StatusConfirm.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryStatus } from 'meta/area/status'
import { AssessmentName } from 'meta/assessment/assessment'
import { Users } from 'meta/user'

import { AreaActions } from 'client/store/area/actions'
import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useAppDispatch } from 'client/store/hooks'
import { useTablePaginatedData } from 'client/store/tablePaginated/hooks/tablePaginated'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryIso } from 'client/hooks'
import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from 'client/components/Modal'

import { StatusTransition } from '../types'
import UserList from './UserList'

type Props = {
  onClose: () => void
  status: StatusTransition
}

const StatusConfirm: React.FC<Props> = (props) => {
  const { onClose, status } = props

  const dispatch = useAppDispatch()
  const i18n = useTranslation()
  const countryIso = useCountryIso()
  const user = useUser()
  const country = useAssessmentCountry()

  const [notifyUsers, setNotifyUsers] = useState<boolean>(true)
  const [notifySelf, setNotifySelf] = useState<boolean>(true)

  const [textareaValue, setTextareaValue] = useState<string>('')
  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()

  const recipients = useTablePaginatedData({ path: `${ApiEndPoint.User.many()}#recipients` })
  const hasRecipients = !Objects.isEmpty(recipients)

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
            onChange={({ target: { value } }) => setTextareaValue(value)}
            placeholder={i18n.t('navigation.changeStatusTextPlaceholder')}
            value={textareaValue}
          />
        </div>

        {status.status !== CountryStatus.approval && Users.isAdministrator(user) && hasRecipients && (
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
        {notifyUsers && <UserList status={status} />}
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
