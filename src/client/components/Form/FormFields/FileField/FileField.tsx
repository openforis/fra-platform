import React, { useCallback, useState } from 'react'

import { FileSummary } from 'meta/file/file'

import FileUpload from 'client/components/FileUpload'
import { FileUploadOnChange } from 'client/components/FileUpload/types'
import FormField from 'client/components/Form/FormFields/FormField'

import { FieldProps } from '../types'

const FileField: React.FC<FieldProps> = (props) => {
  const { fieldDefinition, register, setValue, trigger, watch } = props
  const { name, nameField } = fieldDefinition

  const [files, setFiles] = useState<Array<FileSummary>>()

  const onChange = useCallback<FileUploadOnChange>(
    (uploadedFiles) => {
      const file = uploadedFiles.at(0)
      setFiles(uploadedFiles)
      setValue(name, file?.uuid ?? '')
      // If nameField is empty, populate the given name field with file name
      if (nameField && !watch(nameField) && file?.name) {
        setValue(nameField as never, file.name as never)
      }
      trigger(name)
    },
    [name, nameField, setValue, trigger, watch]
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
