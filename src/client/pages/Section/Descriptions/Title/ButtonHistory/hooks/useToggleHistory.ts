import { useCallback } from 'react'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { HistoryActions } from 'client/store/data/history/actions'
import { useAppDispatch } from 'client/store/hooks'

type Returned = () => void

type Props = {
  target: CommentableDescriptionName
}

export const useToggleHistory = (props: Props): Returned => {
  const { target } = props
  const dispatch = useAppDispatch()

  return useCallback(() => {
    dispatch(HistoryActions.toggleActivities({ labelKey: 'description.dataSourcesPlus', target }))
  }, [dispatch, target])
}
