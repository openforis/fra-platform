import React from 'react'
import PropTyeps from 'prop-types'

import useI18n from '@webapp/components/hooks/useI18n'

const RowNoticeMessage = props => {
  const { row } = props
  const { cols } = row
  const i18n = useI18n()

  return (
    <tr>
      {cols.map(col => {
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

RowNoticeMessage.propTypes = {
  row: PropTyeps.object.isRequired,
}
export default RowNoticeMessage
