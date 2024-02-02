import './Actions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { useIsRepositoryLoading, useRepositoryItem } from 'client/store/ui/repository/hooks'
import { useOnDelete } from 'client/pages/CountryHome/Repository/Panel/Actions/hooks/useOnDelete'

import { useClosePanel } from '../../hooks/useClosePanel'
import { useUpsertRepositoryItem } from './hooks/useUpsertRepositoryItem'

const Actions: React.FC = () => {
  const { t } = useTranslation()
  const repositoryItem = useRepositoryItem()

  const upsertRepositoryItem = useUpsertRepositoryItem()

  const closePanel = useClosePanel()
  const disabled = useIsRepositoryLoading()
  const onDelete = useOnDelete()

  if (!repositoryItem) return null
  const showDelete = !Objects.isEmpty(repositoryItem.uuid)

  return (
    <div className="repository-form__actions">
      <button
        disabled={disabled}
        onClick={upsertRepositoryItem}
        className={classNames('btn btn-primary', { disabled })}
        type="button"
      >
        {t('common.done')}
      </button>

      {showDelete && (
        <button disabled={disabled} onClick={onDelete} className="btn btn-destructive" type="button">
          {t('common.delete')}
        </button>
      )}

      <button disabled={disabled} className="btn btn-secondary" type="button" onClick={closePanel}>
        {t('common.cancel')}
      </button>
    </div>
  )
}

export default Actions
