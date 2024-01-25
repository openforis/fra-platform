import './Actions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  setOpenPanel: (open: boolean) => void
  onSave: () => void
}

const Actions: React.FC<Props> = (props: Props) => {
  const { setOpenPanel, onSave } = props
  const { t } = useTranslation()

  return (
    <div className="repository-form__actions">
      <button onClick={onSave} className="btn btn-primary" type="button">
        {t('editUser.done')}
      </button>
      <button className="btn btn-secondary" type="button" onClick={() => setOpenPanel(false)}>
        {t('common.cancel')}
      </button>
    </div>
  )
}

export default Actions
