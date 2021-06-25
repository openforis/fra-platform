import './userConsulationSurvey.scss'
import React, { useState } from 'react'

import { useI18n } from '@webapp/components/hooks'

import ButtonCheckBox from '@webapp/components/buttonCheckBox'

const localStorageKey = 'uc/doNotShow'

const UserConsultationSurvey: React.FC = () => {
  const i18n = useI18n()

  const [showDialog, setShowDialog] = useState<boolean>(localStorage.getItem(localStorageKey) !== 'true')
  const [doNotShow, setDoNotShow] = useState<boolean>(false)

  const setDoNotShowHandler = () => {
    setDoNotShow((prevState) => {
      const doNotShowUpdate = !prevState
      localStorage.setItem(localStorageKey, String(doNotShowUpdate))
      return doNotShowUpdate
    })
  }

  if (!showDialog) return null

  return (
    <div className="uc-survey">
      <div className="uc-survey-content">
        <div className="uc-survey__message">
          <img alt="" src="/img/tucan.svg" />
          <div>
            <div>{i18n.t('uc.message1')}</div>
            <div>{i18n.t('uc.message2')}</div>
            <div>{i18n.t('uc.message3')}</div>
            <br />
            <div>{i18n.t('uc.message4')}</div>
            <div>{i18n.t('uc.message5')}</div>
          </div>
        </div>
        <div className="uc-survey__btns">
          <button className="btn btn-secondary" type="button" onClick={() => setShowDialog(false)}>
            {i18n.t('uc.noThanks')}
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              window.open('https://www.w3schools.com', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes')
              setShowDialog(false)
            }}
          >
            {i18n.t('uc.yesPlease')}
          </button>
        </div>
        <div>
          <ButtonCheckBox label="uc.doNotShow" onClick={setDoNotShowHandler} checked={doNotShow} />
        </div>
      </div>
    </div>
  )
}

export default UserConsultationSurvey
