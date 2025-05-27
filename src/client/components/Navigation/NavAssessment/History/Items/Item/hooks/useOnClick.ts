import { useCallback } from 'react'

import { DataActions } from 'client/store/data'
import { useAppDispatch } from 'client/store/hooks'

import { Props } from '../props'

type Returned = () => void

export const useOnClick = (props: Props): Returned => {
  const { datum, target } = props

  const dispatch = useAppDispatch()

  return useCallback<Returned>(() => {
    dispatch(DataActions.toggleHistoryActivitiesCompareItem({ datum, target }))
  }, [datum, dispatch, target])
}
