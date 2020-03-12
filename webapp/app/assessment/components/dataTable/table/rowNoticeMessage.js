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
        return (
          <td key={labelKey} rowSpan={rowSpan} colSpan={colSpan}>
            {i18n.t(labelKey)}
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
