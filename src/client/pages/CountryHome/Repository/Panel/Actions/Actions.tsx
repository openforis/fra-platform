import './Actions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { RepositoryItems } from 'meta/cycleData/repository'

import { useIsFileUploadLoading } from 'client/store/ui/fileUpload'
import { useIsRepositoryLoading, useRepositoryItem } from 'client/store/ui/repository'

import { useClosePanel } from '../../hooks/useClosePanel'
import { useOnDelete } from './hooks/useOnDelete'
import { useUpsertRepositoryItem } from './hooks/useUpsertRepositoryItem'

const Actions: React.FC = () => {
  const { t } = useTranslation()
  const repositoryItem = useRepositoryItem()

  const upsertRepositoryItem = useUpsertRepositoryItem()

  const closePanel = useClosePanel()
  const fileUploadLoading = useIsFileUploadLoading()
  const valid = Objects.isEmpty(RepositoryItems.validate(repositoryItem))
  const isRepositoryLoading = useIsRepositoryLoading()
  const disabled = isRepositoryLoading || fileUploadLoading
  const disabledDone = disabled || !valid
  const onDelete = useOnDelete()

  if (!repositoryItem) return null
  const showDelete = !Objects.isEmpty(repositoryItem.uuid)

  return (
    <div className="repository-form__actions">
      <button
        disabled={disabledDone}
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
