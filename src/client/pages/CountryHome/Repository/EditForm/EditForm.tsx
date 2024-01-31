import './EditForm.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Icon from 'client/components/Icon'
import Panel from 'client/pages/CountryHome/Repository/Panel'

import { useOpenPanel } from '../hooks/useOpenPanel'

const EditForm: React.FC = () => {
  const { t } = useTranslation()
  const openPanel = useOpenPanel()

  return (
    <div className="repository__edit-form">
      <button className="btn-s btn-primary" onClick={openPanel} type="button">
        <Icon className="icon-sub icon-white" name="small-add" />
        {t('review.add')}
      </button>
      <Panel />
    </div>
  )
}

export default EditForm
