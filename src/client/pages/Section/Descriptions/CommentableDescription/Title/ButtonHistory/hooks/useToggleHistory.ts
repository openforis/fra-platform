import { useCallback } from 'react'

import { CommentableDescriptionName } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'

type Returned = () => void

type Props = {
  target: CommentableDescriptionName
}

export const useToggleHistory = (props: Props): Returned => {
  const { target } = props
  const dispatch = useAppDispatch()

  return useCallback(() => {
    dispatch(DataActions.toggleHistory({ labelKey: 'description.dataSourcesPlus', target }))
  }, [dispatch, target])
}
