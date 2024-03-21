import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { Cols, ColType } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { useCycle } from 'client/store/assessment'
import { useTopicKeys } from 'client/store/ui/messageCenter/hooks'
import ReviewIndicator from 'client/components/ReviewIndicator'

import { Props } from '../props'
import Cell from './Cell'
import CellHeader from './CellHeader'

const RowData: React.FC<Props> = (props) => {
  const { data, assessmentName, sectionName, table, row, disabled } = props

  const { t } = useTranslation()
  const cycle = useCycle()
  const openTopics = useTopicKeys()

  const { cols } = row
  const colHeader = [ColType.placeholder, ColType.header].includes(cols[0].props.colType) ? cols[0] : undefined
  const colsData = colHeader ? cols.slice(1, cols.length) : cols
  const withReview = !table.props.secondary || row.props.withReview?.[cycle.uuid]

  const id = `${row.props.type}_${row.id}_${row.props.variableName ?? ''}`
  const className = classNames({ 'fra-row-comments__open': openTopics.includes(Topics.getDataReviewTopicKey(row)) })

  return (
    <tr className={className} id={id}>
      {colHeader && <CellHeader assessmentName={assessmentName} col={colHeader} row={row} />}

      {colsData.map((col) => (
        <Cell
          key={col.uuid}
          assessmentName={assessmentName}
          col={col}
          data={data}
          disabled={disabled}
          row={row}
          rowIndex={Number(row.props.index)}
          sectionName={sectionName}
          table={table}
        />
      ))}

      {!disabled && withReview && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            title={colHeader ? Cols.getLabel({ cycle, col: colHeader, t }) : ''}
            topicKey={Topics.getDataReviewTopicKey(row)}
          />
        </td>
      )}
    </tr>
  )
}

export default RowData
