import './RowNoticeMessage.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Cols } from 'meta/assessment/cols'

import { useCycle } from 'client/store/assessment'
import { DataCell, DataRow } from 'client/components/DataGrid'
import { RowProps } from 'client/pages/Section/DataTable/Table/types'

const RowNoticeMessage: React.FC<Omit<RowProps, 'rowCount' | 'rowIndex'>> = (props) => {
  const { row } = props

  const { t } = useTranslation()
  const cycle = useCycle()
  const { cols } = row

  return (
    <DataRow>
      {cols.map((col) => {
        const message = Cols.getLabel({ col, cycle, t })

        if (!message) return null

        return (
          <DataCell key={col.uuid} className="table-grid__notice-message-cell" noBorder>
            {message}
          </DataCell>
        )
      })}
    </DataRow>
  )
}

export default RowNoticeMessage
