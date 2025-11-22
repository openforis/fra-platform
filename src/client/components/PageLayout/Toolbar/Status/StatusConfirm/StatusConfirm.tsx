import './StatusConfirm.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { AssessmentName } from 'meta/assessment/assessment'

import { AreaActions } from 'client/store/area/actions'
import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryIso } from 'client/hooks/country'
import ButtonCheckbox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from 'client/components/Modal'
import NotifyUsers from 'client/components/PageLayout/Toolbar/Status/StatusConfirm/NotifyUsers'

import { StatusTransition } from '../types'

type Props = {
  onClose: () => void
  status: StatusTransition
}

const StatusConfirm: React.FC<Props> = (props) => {
  const { onClose, status } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const country = useAssessmentCountry()

  const [notifyUsers, setNotifyUsers] = useState<boolean>(true)
  const [notifySelf, setNotifySelf] = useState<boolean>(true)

  const [textareaValue, setTextareaValue] = useState<string>('')
  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()

  return (
    <Modal isOpen>
      <ModalHeader>
        <div className="modal-header-center">{t(`assessment.status.${status.status}.${status.direction}`)}</div>
        <ModalClose onClose={onClose} />
      </ModalHeader>

      <ModalBody className="assessment-status-confirm__body">
        <div style={{ height: '160px' }}>
          <textarea
            className="assessment-status-confirm__message"
            onChange={({ target: { value } }): void => setTextareaValue(value)}
            placeholder={t('navigation.changeStatusTextPlaceholder')}
            value={textareaValue}
          />
        </div>

        <NotifyUsers notifyUsers={notifyUsers} setNotifyUsers={setNotifyUsers} status={status} />

        <ButtonCheckbox
          checked={notifySelf}
          label={t('navigation.notifySelf')}
          onClick={(): void => setNotifySelf(!notifySelf)}
          variant={ButtonCheckboxVariant.checkbox}
        />
      </ModalBody>

      <ModalFooter>
        <button className="btn btn-secondary modal-footer__item" onClick={onClose} type="button">
          {t('navigation.cancel')}
        </button>
        <button
          className="btn btn-primary modal-footer__item"
          onClick={(): void => {
            dispatch(
              AreaActions.updateCountry({
                notifyUsers,
                notifySelf,
                country: { ...country, props: { ...country.props, status: status.status } },
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
          {t('common.submit')}
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default StatusConfirm
