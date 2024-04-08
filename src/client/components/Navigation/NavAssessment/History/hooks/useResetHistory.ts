import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'

export const useResetHistory = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(DataActions.resetHistory())
    }
  }, [dispatch, location.pathname])
}
