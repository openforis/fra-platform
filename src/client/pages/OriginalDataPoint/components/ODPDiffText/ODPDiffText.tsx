import './ODPDiffText.scss'
import React from 'react'

import classNames from 'classnames'

import DiffText from 'client/components/DiffText'
import { useFieldChanges } from 'client/pages/OriginalDataPoint/hooks/useFieldChanges'

import { ODPDiffTextProps } from './types'

const ODPDiffText: React.FC<ODPDiffTextProps> = (props) => {
  const { excludePaddings } = props

  const changes = useFieldChanges(props)

  return <DiffText changes={changes} className={classNames({ 'odp-diff-text': !excludePaddings })} />
}

export default ODPDiffText
