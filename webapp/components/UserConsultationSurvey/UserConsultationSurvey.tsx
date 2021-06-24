import './userConsulationSurvey.scss'
import React, { useState } from 'react'

import { useI18n } from '@webapp/components/hooks'

import ButtonCheckBox from '@webapp/components/buttonCheckBox'

const UserConsultationSurvey: React.FC = () => {
  const i18n = useI18n()
  // TODO: get default value of  showDialog from local storage
  const [showDialog, setShowDialog] = useState<boolean>(true)
  const [doNotShow, setDoNotShow] = useState<boolean>(false)

  const setDoNotShowHandler = () => {
    setDoNotShow((prevState) => {
      // TODO: set in local storage do not show uc survey again
      return !prevState
    })
  }

  if (!showDialog) return null

  return (
    <div className="uc-survey">
      <div className="uc-survey-content">
        <div>
          <div>{i18n.t('uc.message1')}</div>
          <div>{i18n.t('uc.message2')}</div>
          <div>{i18n.t('uc.message3')}</div>
          <div>{i18n.t('uc.message4')}</div>
          <div>{i18n.t('uc.message5')}</div>
        </div>
        <div className="uc-survey__btns">
          <button className="btn btn-secondary" type="button" onClick={() => setShowDialog(false)}>
            {i18n.t('uc.noThanks')}
          </button>
          <button className="btn btn-primary" type="button">
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
