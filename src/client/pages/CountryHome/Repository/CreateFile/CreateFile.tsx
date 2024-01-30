import './CreateFile.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Icon from 'client/components/Icon'
import Panel from 'client/pages/CountryHome/Repository/Panel'

const CreateFile: React.FC = () => {
  const { t } = useTranslation()
  const [openPanel, setOpenPanel] = React.useState(false)

  return (
    <div className="create-file">
      <button
        className="btn-s btn-primary"
        onClick={() => {
          setOpenPanel(!openPanel)
        }}
        type="button"
      >
        <Icon className="icon-sub icon-white" name="small-add" />
        {t('review.add')}
      </button>

      <Panel openPanel={openPanel} setOpenPanel={setOpenPanel} />
    </div>
  )
}

export default CreateFile
