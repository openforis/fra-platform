import { useCallback } from 'react'

import { HistoryActions } from 'client/store/data/history/actions'
import { useAppDispatch } from 'client/store/hooks'

import { Props } from '../props'

type Returned = () => void

export const useOnClick = (props: Props): Returned => {
  const { datum, target } = props

  const dispatch = useAppDispatch()

  return useCallback<Returned>(() => {
    dispatch(HistoryActions.toggleActivitiesCompareItem({ datum, target }))
  }, [datum, dispatch, target])
}
