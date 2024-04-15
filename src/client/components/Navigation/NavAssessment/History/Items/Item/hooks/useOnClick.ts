import { useCallback } from 'react'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'

import { Props } from '../props'

type Returned = () => void

export const useOnClick = (props: Props): Returned => {
  const { datum, target } = props

  const dispatch = useAppDispatch()

  return useCallback<Returned>(() => {
    dispatch(DataActions.toggleCompareHistoryItem({ datum, target }))
  }, [datum, dispatch, target])
}
