import React, { useCallback, useEffect, useRef, useState } from 'react'

import { BaseFileSummary, FileSummary } from 'meta/file/file'
import { Objects } from 'utils/objects'

import FileUpload from 'client/components/FileUpload'
import { FileUploadOnChange } from 'client/components/FileUpload/types'
import FormField from 'client/components/Form/FormFields/FormField'

import { FieldProps } from '../types'

const FileField: React.FC<FieldProps> = (props) => {
  const { fieldDefinition, formState, register, setValue, trigger, watch } = props
  const { initialValue, name, nameField } = fieldDefinition

  const [files, setFiles] = useState<Array<BaseFileSummary>>()
  // Whether the user has uploaded a new file
  const hasUserInteracted = useRef(false)

  useEffect(() => {
    if (hasUserInteracted.current || Objects.isEmpty(initialValue)) return
    setFiles(initialValue as Array<BaseFileSummary>)
  }, [initialValue])

  const onChange = useCallback<FileUploadOnChange>(
    (uploadedFiles) => {
      hasUserInteracted.current = true
      const file = uploadedFiles.at(0)
      // Allow uploading a new file when the old one is deleted
      setFiles(Objects.isEmpty(uploadedFiles) ? undefined : uploadedFiles)
      setValue(name, (file as FileSummary)?.uuid ?? '', { shouldDirty: true })
      // If nameField is empty, populate the given name field with file name
      if (nameField && !watch(nameField) && file?.name) {
        setValue(nameField as never, file.name as never, { shouldDirty: true })
      }
      if (formState.isSubmitted) trigger(name)
    },
    [formState.isSubmitted, name, nameField, setValue, trigger, watch]
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
