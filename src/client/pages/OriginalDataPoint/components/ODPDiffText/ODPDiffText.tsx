import React from 'react'

import DiffText from 'client/components/DiffText'
import { useFieldChanges } from 'client/pages/OriginalDataPoint/hooks/useFieldChanges'

import { ODPDiffTextProps } from './types'

const ODPDiffText: React.FC<ODPDiffTextProps> = (props) => {
  const { className } = props

  const changes = useFieldChanges(props)

  return <DiffText changes={changes} className={className} />
}

export default ODPDiffText
