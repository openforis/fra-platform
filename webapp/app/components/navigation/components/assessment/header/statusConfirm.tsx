import './statusConfirm.less'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as R from 'ramda'
import { isAdministrator } from '@common/countryRole'
import * as Assessment from '@common/assessment/assessment'
import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from '@webapp/components/modal'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useI18n from '@webapp/components/hooks/useI18n'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import { changeAssessment } from '@webapp/app/country/actions'

type Props = {
  assessment: any
  targetStatus: any
  onClose: (...args: any[]) => any
}
const StatusConfirm = (props: Props) => {
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
          {(i18n as any).t(
            `assessment.status.${R.prop('transition', targetStatus)}.${R.prop('direction', targetStatus)}`
          )}
        </div>
        <ModalClose onClose={onClose} />
      </ModalHeader>

      <ModalBody>
        <div style={{ height: '160px' }}>
          <textarea
            autoFocus
            className="nav-assessment-status-confirm__message"
            placeholder={(i18n as any).t('navigation.changeStatusTextPlaceholder')}
            onChange={({ target: { value } }) => setTextareaValue(value)}
          />
        </div>

        {isAdministrator(userInfo) && (
          <div className="nav-assessment-status-confirm__notify-users" onClick={() => setNotifyUsers(!notifyUsers)}>
            <div className={`fra-checkbox${notifyUsers ? '' : ' checked'}`} />
            {(i18n as any).t('navigation.doNotNotifyUsers')}
          </div>
        )}
      </ModalBody>

      <ModalFooter>
        <button className="btn btn-secondary modal-footer__item" onClick={onClose}>
          {(i18n as any).t('navigation.cancel')}
        </button>
        <button
          className="btn btn-primary modal-footer__item"
          onClick={() => {
            const assessmentUpdate = R.pipe(
              Assessment.assocStatus(targetStatus.transition),
              R.assoc('message', textareaValue)
            )(assessment)
            dispatch(changeAssessment(countryIso, assessmentUpdate, notifyUsers))
            onClose()
          }}
        >
          {(i18n as any).t('navigation.submit')}
        </button>
      </ModalFooter>
    </Modal>
  )
}
export default StatusConfirm
