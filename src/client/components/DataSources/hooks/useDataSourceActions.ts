import { useMemo } from 'react'

import { DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { Topics } from 'meta/messageCenter/topics'

import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'
import { PropsDataSources } from 'client/components/DataSources/types'

type Props = Pick<PropsDataSources, 'onDelete' | 'options'> & {
  dataSource: DataSource
  readOnly: boolean
}

export const useDataSourceActions = (props: Props): Array<DataRowAction> => {
  const { dataSource, onDelete, options, readOnly } = props
  const { canEdit, canReview } = options

  return useMemo<Array<DataRowAction>>(() => {
    const actions: Array<DataRowAction> = []

    if (readOnly || dataSource.placeholder) return actions

    if (canEdit) {
      actions.push({ type: DataRowActionType.Delete, onClick: () => onDelete(dataSource) })
    }

    if (canReview) {
      const title = `${dataSource.variables?.join(', ')} | ${dataSource.year}`
      const topicKey = Topics.getDataSourceReviewTopicKey(dataSource)
      actions.push({ type: DataRowActionType.Review, title, topicKey })
    }

    return actions
  }, [canEdit, canReview, dataSource, onDelete, readOnly])
}
