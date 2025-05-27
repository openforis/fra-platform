import { useEffect } from 'react'

import { AreaActions } from 'client/store/area/actions'
import { useAppDispatch } from 'client/store/hooks'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useInitAreas = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName } = useCycleRouteParams()

  useEffect(() => {
    dispatch(AreaActions.getAreas({ assessmentName, cycleName }))
  }, [assessmentName, cycleName, dispatch])
}
