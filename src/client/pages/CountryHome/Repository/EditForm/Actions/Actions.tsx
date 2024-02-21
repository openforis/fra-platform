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
    <>
      <DataCell className="repository-form__actions" noBorder>
        <Button inverse size={ButtonSize.m} label={t('common.cancel')} onClick={closePanel} disabled={disabled} />
        <Button
          type={ButtonType.primary}
          size={ButtonSize.m}
          label={t('editUser.done')}
          onClick={upsertRepositoryItem}
          disabled={disabledDone}
        />
      </DataCell>

      <DataCell className="repository-form__actions-delete">
        {showDelete && (
          <Button
            type={ButtonType.danger}
            size={ButtonSize.m}
            label={t('common.delete')}
            iconName="trash-simple"
            onClick={onDelete}
            disabled={disabled}
          />
        )}
      </DataCell>
    </>
  )
}

export default Actions
