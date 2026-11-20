import React, { useCallback } from 'react'

import { PropsDataSourceComponent } from 'client/components/DataSources/types'
import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'

const Reference: React.FC<PropsDataSourceComponent> = (props) => {
  const { dataSource, disabled, focusedLink, invalidLinks, onChange, validationErrors } = props

  const _onChange = useCallback(
    (value: string) => {
      onChange(dataSource, 'reference', value)
    },
    [dataSource, onChange]
  )

  return (
    <EditorWYSIWYGLinks
      disabled={disabled}
      focusedLink={focusedLink}
      invalidLinks={invalidLinks}
      onChange={_onChange}
      repository
      validationErrors={validationErrors}
      value={dataSource.reference ?? ''}
    />
  )
}

export default Reference
