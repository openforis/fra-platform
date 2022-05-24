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
        const { label, rowSpan, colSpan } = col.props
        const message = label?.key ? i18n.t(label?.key) : null
        return (
          <td key={message} className="fra-table__notice-message-cell" rowSpan={rowSpan} colSpan={colSpan}>
            {message && <div className="message">{message}</div>}
          </td>
        )
      })}
    </tr>
  )
}

export default RowNoticeMessage
