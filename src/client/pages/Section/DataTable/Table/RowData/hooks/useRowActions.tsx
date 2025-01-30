import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Col, Cols, Row, Table } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { useCycle } from 'client/store/assessment'
import { useCanViewReview } from 'client/store/user/hooks'
import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'

type Props = {
  colHeader?: Col
  row: Row
  sectionName: string
  table: Table
}

type Returned = Array<DataRowAction>

export const useRowActions = (props: Props): Returned => {
  const { colHeader, row, sectionName, table } = props

  const { t } = useTranslation()
  const cycle = useCycle()

  const withReview = !table.props.secondary || row.props.withReview?.[cycle.uuid]
  const canViewReview = useCanViewReview(sectionName)

  return useMemo<Returned>(() => {
    if (!canViewReview || !withReview) return []

    return [
      {
        title: colHeader ? Cols.getLabel({ cycle, col: colHeader, t }) : '',
        topicKey: Topics.getDataReviewTopicKey(row),
        type: DataRowActionType.Review,
      },
    ]
  }, [canViewReview, colHeader, cycle, row, t, withReview])
}
