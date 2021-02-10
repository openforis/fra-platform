import React from 'react'
import useI18n from '@webapp/components/hooks/useI18n'

type Props = {
  row: any
}
const RowNoticeMessage = (props: Props) => {
  const { row } = props
  const { cols } = row
  const i18n = useI18n()
  return (
    <tr>
      {cols.map((col: any) => {
        const { labelKey, rowSpan, colSpan } = col
        const label = labelKey ? (i18n as any).t(labelKey) : null
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
