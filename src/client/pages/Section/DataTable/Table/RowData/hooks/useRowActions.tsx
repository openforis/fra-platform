import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Col } from 'meta/assessment/col'
import { Cols } from 'meta/assessment/cols'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'
import { Topics } from 'meta/messageCenter'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCanViewReview } from 'client/store/user/hooks/auth'
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
