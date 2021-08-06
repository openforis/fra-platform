import React from 'react'

import { useI18n } from '@webapp/components/hooks'

import { Props } from '../props'

const RowNoticeMessage: React.FC<Props> = (props) => {
  const { row } = props

  const i18n = useI18n()
  const { cols } = row

  return (
    <tr>
      {cols.map((col) => {
        const { labelKey, rowSpan, colSpan } = col
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
