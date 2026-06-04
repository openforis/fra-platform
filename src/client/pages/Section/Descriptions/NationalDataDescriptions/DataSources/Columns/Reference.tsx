import React, { useCallback } from 'react'

import { DataSource } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'

import { useOnChange } from './hook/useOnChange'

type Props = {
  dataSource: DataSource
  disabled: boolean
  sectionName: SectionName
  validationErrors: Array<string>
}

const Reference: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, sectionName, validationErrors } = props

  const onChange = useOnChange({ sectionName, dataSource })

  const _onChange = useCallback(
    (value: string) => {
      onChange('reference', value)
    },
    [onChange]
  )

  return (
    <EditorWYSIWYGLinks
      disabled={disabled}
      onChange={_onChange}
      repository
      validationErrors={validationErrors}
      value={dataSource.reference ?? ''}
    />
  )
}

export default Reference
