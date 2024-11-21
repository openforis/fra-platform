import './RowNoticeMessage.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Cols } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { DataCell, DataRow } from 'client/components/DataGrid'

import { Props } from '../props'

const RowNoticeMessage: React.FC<Props> = (props) => {
  const { row } = props

  const { t } = useTranslation()
  const cycle = useCycle()
  const { cols } = row

  return (
    <DataRow>
      {cols.map((col) => {
        const { gridColumn, gridRow } = Cols.getStyle({ col, cycle })
        const message = Cols.getLabel({ cycle, col, t })

        if (!message) return null

        return (
          <DataCell
            key={col.uuid}
            className="table-grid__notice-message-cell"
            gridColumn={gridColumn}
            gridRow={gridRow}
            noBorder
          >
            {message}
          </DataCell>
        )
      })}
    </DataRow>
  )
}

export default RowNoticeMessage
