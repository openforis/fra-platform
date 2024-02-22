import './Actions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { useIsFileUploadLoading } from 'client/store/ui/fileUpload'
import { useIsRepositoryItemValid, useIsRepositoryLoading, useRepositoryItem } from 'client/store/ui/repository'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import { DataCell } from 'client/components/DataGrid'

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
    <DataCell className="repository-form__actions" noBorder>
      <Button
        disabled={disabled}
        iconName="undo"
        inverse
        label={t('common.cancel')}
        onClick={closePanel}
        size={ButtonSize.m}
      />
      <Button
        disabled={disabledDone}
        iconName="floppy-disk"
        label={t('editUser.done')}
        onClick={upsertRepositoryItem}
        size={ButtonSize.m}
        type={ButtonType.primary}
      />
      {showDelete && (
        <Button
          className="button-delete"
          disabled={disabled}
          iconName="trash-simple"
          onClick={onDelete}
          size={ButtonSize.m}
          type={ButtonType.danger}
        />
      )}
    </DataCell>
  )
}

export default Actions
