import { useEffect } from 'react'

import { AssessmentActions } from 'client/store/assessment'
import { useAppDispatch } from 'client/store/hooks'

export const useInitApp = (): void => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(AssessmentActions.initApp())
  }, [dispatch])
}
