import React from 'react'
import { useTranslation } from 'react-i18next'

import { useRepositoryFile, useRepositoryItemPropValidation } from 'client/store/ui/repository'
import { DataCell } from 'client/components/DataGrid'
import FileUpload from 'client/components/FileUpload'
import SelectedFile from 'client/pages/CountryHome/Repository/EditForm/InputFieldFile/SelectedFile'

import { useGetFileMetadata } from './hooks/useGetFileMetadata'

const FileInputField: React.FC = () => {
  const { t } = useTranslation()
  const file = useRepositoryFile()

  const id = `repository_form-input-file`

  const error = useRepositoryItemPropValidation('fileUuid')

  useGetFileMetadata()

  return (
    <>
      <DataCell error={Boolean(error)} noBorder>
        <label className="repository-form__label" htmlFor={id}>
          {t(`common.file`)}
        </label>
      </DataCell>
      <DataCell editable error={Boolean(error)} lastCol lastRow>
        {file?.uuid ? <SelectedFile /> : <FileUpload id={id} />}
        <div className="repository-form__error-label">{error ? t(error) : ''}</div>
      </DataCell>
    </>
  )
}

export default FileInputField
