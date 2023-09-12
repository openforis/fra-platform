import { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { AssessmentActions } from 'client/store/assessment'

export const useInitApp = (): void => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(AssessmentActions.initApp())
  }, [dispatch])
}
