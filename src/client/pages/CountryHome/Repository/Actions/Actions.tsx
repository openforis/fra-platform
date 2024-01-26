import React from 'react'
import { useTranslation } from 'react-i18next'

import Icon from 'client/components/Icon'
import SlidingPanel from 'client/components/SlidingPanel'

const Actions: React.FC = () => {
  const { t } = useTranslation()
  const [openPanel, setOpenPanel] = React.useState(false)

  return (
    <>
      <div className="actions">
        <button
          className="btn-s btn-link btn-edit"
          onClick={() => {
            setOpenPanel(!openPanel)
          }}
          type="button"
        >
          <Icon name="pencil" />
        </button>
      </div>
      <SlidingPanel openPanel={openPanel} setOpenPanel={setOpenPanel}>
        <button onClick={() => setOpenPanel(false)} className="btn btn-destructive" type="button">
          {t('nationalDataPoint.delete')}
        </button>
        <button onClick={() => setOpenPanel(false)} className="btn btn-secondary" type="button">
          {t('common.cancel')}
        </button>
      </SlidingPanel>
    </>
  )
}

export default Actions
