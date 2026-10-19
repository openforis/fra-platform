import { MouseEvent, useCallback } from 'react'

import { useAppDispatch } from 'client/store/hooks'
import { AreaSelectorActions } from 'client/store/ui/areaSelector/actions'

type Props = { roleName: string }
type Returned = (event: MouseEvent) => void

export const useHandleReset = (props: Props): Returned => {
  const { roleName } = props
  const dispatch = useAppDispatch()

  return useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      dispatch(AreaSelectorActions.resetStatusFilter({ roleName }))
    },
    [dispatch, roleName]
  )
}
