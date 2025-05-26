import { useCallback } from 'react'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { DataActions } from 'client/store/data'
import { useAppDispatch } from 'client/store/hooks'

type Returned = () => void

type Props = {
  target: CommentableDescriptionName
}

export const useToggleHistory = (props: Props): Returned => {
  const { target } = props
  const dispatch = useAppDispatch()

  return useCallback(() => {
    dispatch(DataActions.toggleHistoryActivities({ labelKey: 'description.dataSourcesPlus', target }))
  }, [dispatch, target])
}
