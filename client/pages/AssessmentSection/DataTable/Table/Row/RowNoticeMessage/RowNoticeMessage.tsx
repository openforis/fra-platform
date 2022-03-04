import React from 'react'

import { useTranslation } from 'react-i18next'
import { Props } from '../props'

const RowNoticeMessage: React.FC<Props> = (props) => {
  const { row } = props

  const i18n = useTranslation()
  const { cols } = row

  return (
    <tr>
      {cols.map((col) => {
        const { labelKey, rowSpan, colSpan } = col.props
        const label = labelKey ? i18n.t(labelKey) : null
        return (
          <td key={labelKey} className="fra-table__notice-message-cell" rowSpan={rowSpan} colSpan={colSpan}>
            {label && <div className="message">{label}</div>}
          </td>
        )
      })}
    </tr>
  )
}

export default RowNoticeMessage
