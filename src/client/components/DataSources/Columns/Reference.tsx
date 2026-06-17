import React, { useCallback } from 'react'

import { PropsDataSourceComponent } from 'client/components/DataSources/types'
import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'

const Reference: React.FC<PropsDataSourceComponent> = (props) => {
  const { dataSource, disabled, onChange } = props

  const _onChange = useCallback(
    (value: string) => {
      onChange(dataSource, 'reference', value)
    },
    [dataSource, onChange]
  )

  return <EditorWYSIWYGLinks disabled={disabled} onChange={_onChange} repository value={dataSource.reference ?? ''} />
}

export default Reference
