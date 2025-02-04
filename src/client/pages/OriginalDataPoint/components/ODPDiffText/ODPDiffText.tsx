import './ODPDiffText.scss'
import React from 'react'

import classNames from 'classnames'

import { OriginalDataPoint } from 'meta/assessment'

import DiffText from 'client/components/DiffText'
import { useFieldChanges } from 'client/pages/OriginalDataPoint/hooks/useFieldChanges'

type Props = {
  excludePaddings?: boolean
  originalDataPoint: OriginalDataPoint
  path: Array<string | number>
}

const ODPDiffText: React.FC<Props> = (props) => {
  const { excludePaddings, originalDataPoint, path } = props

  const changes = useFieldChanges({ originalDataPoint, path })

  return <DiffText changes={changes} className={classNames({ 'odp-diff-text': !excludePaddings })} />
}

export default ODPDiffText
