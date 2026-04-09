import React, { useCallback, useState } from 'react'

import { FileSummary } from 'meta/file/file'

import FileUpload from 'client/components/FileUpload'
import { FileUploadOnChange } from 'client/components/FileUpload/types'
import FormField from 'client/components/Form/FormFields/FormField'

import { FieldProps } from '../types'

const FileField: React.FC<FieldProps> = (props) => {
  const { fieldDefinition, register, setValue, trigger } = props
  const { name } = fieldDefinition

  const [files, setFiles] = useState<Array<FileSummary>>()

  const onChange = useCallback<FileUploadOnChange>(
    (uploadedFiles) => {
      setFiles(uploadedFiles)
      setValue(name, uploadedFiles.at(0)?.uuid ?? '')
      trigger(name)
    },
    [name, setValue, trigger]
  )

  return (
    <FormField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      renderInput={() => (
        <>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <input type="hidden" {...register(name)} />
          <FileUpload onChange={onChange} value={files} />
        </>
      )}
    />
  )
}

export default FileField
