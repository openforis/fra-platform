import React from 'react'

import { useI18n } from '../../../../../../../../hooks'
import { PropsCell } from '../props'

const Placeholder: React.FC<PropsCell> = (props) => {
  const { col } = props
  const i18n = useI18n()

  const { label, labelKey, labelParams } = col

  let labelCell = ''
  if (label) labelCell = label
  if (labelKey) labelCell = i18n.t(labelKey, labelParams)

  return <div>{labelCell}</div>
}

export default Placeholder
