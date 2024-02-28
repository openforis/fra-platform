import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from 'client/store'
import { RepositoryActions, useRepositoryFileMeta, useRepositoryItemPropValidation } from 'client/store/ui/repository'
import { DataCell } from 'client/components/DataGrid'
import FileUpload, { FileUploadOnChange } from 'client/components/FileUpload'

const FileInputField: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const fileMeta = useRepositoryFileMeta()
  const error = useRepositoryItemPropValidation('fileUuid')

  const onChange = useCallback<FileUploadOnChange>(
    (files) => {
      dispatch(RepositoryActions.setFile(files.at(0)))
    },
    [dispatch]
  )

  const id = `repository_form-input-file`

  return (
    <>
      <DataCell error={Boolean(error)} noBorder>
        <label className="repository-form__label" htmlFor={id}>
          {t(`common.file`)}
        </label>
      </DataCell>
      <DataCell editable error={Boolean(error)} lastCol lastRow>
        <FileUpload
          canDownload
          id={id}
          onChange={onChange}
          value={fileMeta?.summary ? [fileMeta.summary] : undefined}
        />
        <div className="repository-form__error-label">{error ? t(error) : ''}</div>
      </DataCell>
    </>
  )
}

export default FileInputField
