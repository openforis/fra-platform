import React from 'react'

import { useTranslation } from 'react-i18next'
import { PropsCell } from '../props'

const Placeholder: React.FC<PropsCell> = (props) => {
  const { col, datum } = props
  const { i18n } = useTranslation()

  const { /* label */ labelKey /* labelParams */ } = col.props

  let labelCell = ''
  // if (label) labelCell = label
  if (labelKey) labelCell = i18n.t(labelKey /* labelParams */)
  //
  return <div>{labelCell || datum || ''}</div>
}

export default Placeholder
