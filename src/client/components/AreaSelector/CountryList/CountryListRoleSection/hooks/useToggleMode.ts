import { useCallback } from 'react'

import { useAppDispatch } from 'client/store'
import { AreaSelectorActions } from 'client/store/ui/areaSelector'

type Returned = () => void

export const useToggleMode = (): Returned => {
  const dispatch = useAppDispatch()

  return useCallback<Returned>(() => {
    dispatch(AreaSelectorActions.toggleMode())
  }, [dispatch])
}
