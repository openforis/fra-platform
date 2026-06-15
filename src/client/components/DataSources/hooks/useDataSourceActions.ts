import { useMemo } from 'react'

import { DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { Topics } from 'meta/messageCenter/topics'
import { Objects } from 'utils/objects'

import { DataRowAction, DataRowActionType } from 'client/components/DataGrid'
import { PropsDataSources } from 'client/components/DataSources/types'

type Props = Pick<PropsDataSources, 'columns' | 'onDelete' | 'options'> & {
  dataSource: DataSource
  readOnly: boolean
}

const getTitleType = (props: Pick<Props, 'columns' | 'dataSource'>): string => {
  const { columns, dataSource } = props

  const getLabelType = (value: string): string => columns.type.options.find((o) => o.value === value)?.label?.toString()

  if (Array.isArray(dataSource.type)) {
    return dataSource.type.map(getLabelType).join(', ')
  }

  return getLabelType(dataSource.type as string)
}

export const useDataSourceActions = (props: Props): Array<DataRowAction> => {
  const { columns, dataSource, onDelete, options, readOnly } = props
  const { canEdit, canReview, includeVariables, includeYears } = options

  return useMemo<Array<DataRowAction>>(() => {
    const actions: Array<DataRowAction> = []

    if (readOnly || dataSource.placeholder) return actions

    if (canEdit) {
      actions.push({ type: DataRowActionType.Delete, onClick: () => onDelete(dataSource) })
    }

    if (canReview) {
      const title: Array<string> = []
      if (includeVariables) title.push(dataSource.variables?.join(', '))
      if (includeYears) title.push(String(dataSource.year))
      if (Objects.isEmpty(title)) title.push(getTitleType({ columns, dataSource }))

      const topicKey = Topics.getDataSourceReviewTopicKey(dataSource)
      actions.push({ type: DataRowActionType.Review, title: title.join(' | '), topicKey })
    }

    return actions
  }, [canEdit, canReview, columns, dataSource, includeVariables, includeYears, onDelete, readOnly])
}
