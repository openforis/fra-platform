import './userConsulationSurvey.scss'
import React, { useState } from 'react'

import { useI18n } from '@webapp/hooks'

// const localStorageKey = 'uc/doNotShow'

const UserConsultationSurvey: React.FC = () => {
  const i18n = useI18n()

  // const [showDialog, setShowDialog] = useState<boolean>(localStorage.getItem(localStorageKey) !== 'true')
  const [showDialog, setShowDialog] = useState<boolean>(!__DEV__)
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
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              window.open(
                'https://www.surveymonkey.com/r/FRAUserSurvey',
                '_blank',
                'toolbar=yes,scrollbars=yes,resizable=yes'
              )
              setShowDialog(false)
              // localStorage.setItem(localStorageKey, 'true')
            }}
          >
            {i18n.t('uc.yesPlease')}
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => setShowDialog(false)}>
            {i18n.t('uc.noThanks')}
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => setShowDialog(false)}>
            {i18n.t('uc.alreadyAnswered')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserConsultationSurvey
