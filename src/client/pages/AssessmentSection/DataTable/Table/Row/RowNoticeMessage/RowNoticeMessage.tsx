import React from 'react'
import { useTranslation } from 'react-i18next'

import { Cols } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'

import { Props } from '../props'

const RowNoticeMessage: React.FC<Props> = (props) => {
  const { row } = props

  const { t } = useTranslation()
  const cycle = useCycle()
  const { cols } = row

  return (
    <tr>
      {cols.map((col) => {
        const { rowSpan, colSpan } = Cols.getStyle({ col, cycle })
        const message = Cols.getLabel({ cycle, col, t })

        if (!message) return null

        return (
          <td key={message} className="fra-table__notice-message-cell" rowSpan={rowSpan} colSpan={colSpan}>
            <div className="message">{message}</div>
          </td>
        )
      })}
    </tr>
  )
}

export default RowNoticeMessage
