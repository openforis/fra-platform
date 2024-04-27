import React, { useCallback } from 'react'

import { DataSource, SectionName } from 'meta/assessment'

import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'

import { useOnChange } from './hook/useOnChange'

type Props = {
  dataSource: DataSource
  disabled: boolean
  sectionName: SectionName
}

const Reference: React.FC<Props> = (props: Props) => {
  const { dataSource, disabled, sectionName } = props

  const onChange = useOnChange({ sectionName, dataSource })

  const _onChange = useCallback(
    (value: string) => {
      onChange('reference', value)
    },
    [onChange]
  )

  return <EditorWYSIWYGLinks disabled={disabled} onChange={_onChange} repository value={dataSource.reference ?? ''} />
}

export default Reference
