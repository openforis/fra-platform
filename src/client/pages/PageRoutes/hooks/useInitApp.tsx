import { useEffect } from 'react'

import { ApplicationActions } from 'client/store/application/actions'
import { useAppDispatch } from 'client/store/hooks'

export const useInitApp = (): void => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(ApplicationActions.initApp())
  }, [dispatch])
}
