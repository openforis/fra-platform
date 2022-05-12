import React from 'react'
import { useTranslation } from 'react-i18next'

import { PropsCell } from '../props'

const Placeholder: React.FC<PropsCell> = (props) => {
  const { col, datum } = props
  const { i18n } = useTranslation()

  const { label } = col.props

  let labelCell = ''
  if (label?.label) labelCell = label?.label
  if (label?.key) labelCell = i18n.t(label?.key, label?.params)

  return <div>{labelCell || datum || ''}</div>
}

export default Placeholder
