import React from 'react'

import useI18n from '@webapp/components/hooks/useI18n'

const RowNoticeMessage = () => {
  const i18n = useI18n()

  return (
    <tr>
      <td className="fra-table__notice-message-cell" rowSpan="2">
        {i18n.t('extentOfForest.tableNoticeMessage')}
      </td>
    </tr>
  )
}

export default RowNoticeMessage
