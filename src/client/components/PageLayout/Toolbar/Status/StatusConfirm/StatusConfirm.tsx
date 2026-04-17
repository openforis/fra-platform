import './StatusConfirm.scss'
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'

import { AssessmentName } from 'meta/assessment/assessment'

import { AreaActions } from 'client/store/area/actions'
import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useAppDispatch } from 'client/store/hooks'
import { useCountryIso } from 'client/hooks/country'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import ButtonCheckbox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
import Icon from 'client/components/Icon'
import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from 'client/components/Modal'
import NotifyUsers from 'client/components/PageLayout/Toolbar/Status/StatusConfirm/NotifyUsers'
import ValidationWarning from 'client/components/PageLayout/Toolbar/Status/StatusConfirm/ValidationWarning'
import { StatusTransition } from 'client/components/PageLayout/Toolbar/Status/types'

import { useLinksVerificationGuard } from './hooks/useLinksVerificationGuard'

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

  const [message, setMessage] = useState<string>('')
  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()

  const { canSubmit, guardResult, hasGuardFetchError, isBlocked, isLoading, linksStatusUrl } =
    useLinksVerificationGuard({ status })

  const updateStatus = (): void => {
    dispatch(
      AreaActions.updateCountry({
        notifyUsers,
        notifySelf,
        country: { ...country, props: { ...country.props, status: status.status } },
        countryIso,
        cycleName,
        assessmentName,
        message,
      })
    )
    onClose()
  }

  return (
    <Modal isOpen>
      <ModalHeader>
        <div className="modal-header-center">{t(`assessment.status.${status.status}.${status.direction}`)}</div>
        <ModalClose onClose={onClose} />
      </ModalHeader>

      <ModalBody className="assessment-status-confirm__body">
        {isLoading && <div className="assessment-status-confirm__loading">{t('common.loading')}</div>}

        {hasGuardFetchError && (
          <div className="assessment-status-confirm__notice assessment-status-confirm__notice-error">
            <Icon className="assessment-status-confirm__notice-icon" name="alert" />
            <div className="assessment-status-confirm__notice-content">
              <div className="assessment-status-confirm__notice-text">{t('linksGuard.fetchError')}</div>
            </div>
          </div>
        )}

        {isBlocked && (
          <div className="assessment-status-confirm__notice assessment-status-confirm__notice-error">
            <Icon className="assessment-status-confirm__notice-icon" name="alert" />
            <div className="assessment-status-confirm__notice-content">
              <div className="assessment-status-confirm__notice-text">
                {guardResult.reason &&
                  t('linksGuard.blockedMessage', { reason: t(`linksGuard.reason.${guardResult.reason}`) })}
              </div>
              <div className="assessment-status-confirm__notice-link">
                <Trans
                  components={{ lnk: <Link className="link color-blue" onClick={onClose} to={linksStatusUrl} /> }}
                  i18nKey="linksGuard.suffix"
                />
              </div>
            </div>
          </div>
        )}

        {canSubmit && (
          <>
            <div style={{ height: '160px' }}>
              <textarea
                className="assessment-status-confirm__message"
                onChange={({ target: { value } }): void => setMessage(value)}
                placeholder={t('navigation.changeStatusTextPlaceholder')}
                value={message}
              />
            </div>

            <NotifyUsers notifyUsers={notifyUsers} setNotifyUsers={setNotifyUsers} status={status} />

            <ButtonCheckbox
              checked={notifySelf}
              label={t('navigation.notifySelf')}
              onClick={(): void => setNotifySelf(!notifySelf)}
              variant={ButtonCheckboxVariant.checkbox}
            />
          </>
        )}

        <ValidationWarning status={status} />
      </ModalBody>

      <ModalFooter>
        <Button label={t('common.cancel')} onClick={onClose} size={ButtonSize.l} type={ButtonType.secondary} />
        {canSubmit && <Button label={t('common.submit')} onClick={updateStatus} size={ButtonSize.l} />}
      </ModalFooter>
    </Modal>
  )
}

export default StatusConfirm
