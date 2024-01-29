import './Actions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { useIsRepositoryLoading } from 'client/store/ui/repository/hooks'

type Props = {
  setOpenPanel: (open: boolean) => void
  onSave: () => void
}

const Actions: React.FC<Props> = (props: Props) => {
  const { setOpenPanel, onSave } = props
  const { t } = useTranslation()

  const disabled = useIsRepositoryLoading()

  return (
    <div className="repository-form__actions">
      <button
        disabled={disabled}
        onClick={onSave}
        className={classNames('btn btn-primary', { disabled })}
        type="button"
      >
        {t('editUser.done')}
      </button>
      <button className="btn btn-secondary" type="button" onClick={() => setOpenPanel(false)}>
        {t('common.cancel')}
      </button>
    </div>
  )
}

export default Actions
