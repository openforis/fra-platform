import React from 'react'
import { useTranslation } from 'react-i18next'

import { useRepositoryFile, useRepositoryItemPropValidation } from 'client/store/ui/repository'
import { DataCell } from 'client/components/DataGrid'
import FileUpload from 'client/components/FileUpload'
import SelectedFile from 'client/pages/CountryHome/Repository/EditForm/InputFieldFile/SelectedFile'

import { useGetFileMetadata } from './hooks/useGetFileMetadata'

const FileInputField: React.FC = () => {
  const file = useRepositoryFile()
  const { t } = useTranslation()

  const id = `repository_form-input-file`
  const label = `common.file`

  const error = useRepositoryItemPropValidation('fileUuid')

  useGetFileMetadata()

  return (
    <>
      <DataCell error={Boolean(error)} noBorder>
        <label htmlFor={id} className="repository-form__label">
          {t(label)}
        </label>
      </DataCell>
      <DataCell error={Boolean(error)} noBorder>
        {file?.uuid ? <SelectedFile /> : <FileUpload id={id} />}
        <div className="repository-form__error-label">{error ? t(error) : ''}</div>
      </DataCell>
    </>
  )
}

export default FileInputField
