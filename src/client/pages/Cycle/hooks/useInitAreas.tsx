import { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { AreaActions } from 'client/store/area/slice'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useInitAreas = (): void => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName } = useCycleRouteParams()

  useEffect(() => {
    dispatch(AreaActions.getAreas({ assessmentName, cycleName }))
  }, [assessmentName, cycleName, dispatch])
}
