import './Actions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { useIsFileUploadLoading } from 'client/store/ui/fileUpload'
import { useIsRepositoryItemValid, useIsRepositoryLoading, useRepositoryItem } from 'client/store/ui/repository'
import { DataCell } from 'client/components/DataGrid'
import Icon from 'client/components/Icon'

import { useClosePanel } from '../../hooks/useClosePanel'
import { useOnDelete } from './hooks/useOnDelete'
import { useUpsertRepositoryItem } from './hooks/useUpsertRepositoryItem'

const Actions: React.FC = () => {
  const { t } = useTranslation()
  const repositoryItem = useRepositoryItem()

  const upsertRepositoryItem = useUpsertRepositoryItem()

  const closePanel = useClosePanel()
  const fileUploadLoading = useIsFileUploadLoading()
  const valid = useIsRepositoryItemValid()
  const isRepositoryLoading = useIsRepositoryLoading()
  const disabled = isRepositoryLoading || fileUploadLoading
  const disabledDone = disabled || !valid
  const onDelete = useOnDelete()

  if (!repositoryItem) return null
  const showDelete = !Objects.isEmpty(repositoryItem.uuid)

  return (
    <>
      <DataCell className="repository-form__actions" noBorder>
        <button disabled={disabled} className="btn btn-secondary" type="button" onClick={closePanel}>
          {t('common.cancel')}
        </button>

        <button
          disabled={disabledDone}
          onClick={upsertRepositoryItem}
          className={classNames('btn btn-primary', { disabled })}
          type="button"
        >
          {/* TODO: Move to common.save */}
          {t('editUser.done')}
        </button>
      </DataCell>

      <DataCell className="repository-form__actions-delete">
        {showDelete && (
          <button disabled={disabled} onClick={onDelete} className="btn btn-destructive" type="button">
            <Icon className="icon-sub icon-white" name="trash-simple" />
            {t('common.delete')}
          </button>
        )}
      </DataCell>
    </>
  )
}

export default Actions
