import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { useTopicKeys } from 'client/store/ui/messageCenter/hooks'
import { DataRowAction, DataRowActionType, Review } from 'client/components/DataGrid'

type Props = {
  actions: Array<DataRowAction>
}

export const useHighlighted = (props: Props): boolean => {
  const { actions } = props

  const openTopics = useTopicKeys()

  return useMemo<boolean>(() => {
    if (Objects.isEmpty(actions)) return false

    const reviewAction = actions.find((action) => action.type === DataRowActionType.Review) as Review
    return !Objects.isEmpty(reviewAction) && openTopics.includes(reviewAction.topicKey)
  }, [actions, openTopics])
}
