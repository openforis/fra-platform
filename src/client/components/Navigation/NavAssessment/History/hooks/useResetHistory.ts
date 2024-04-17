import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CommentableDescriptionName } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'

export const useResetHistory = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      // reset table paginated data. add all supported items here
      const pathDataSources = ApiEndPoint.CycleData.history(CommentableDescriptionName.dataSources)
      dispatch(TablePaginatedActions.resetPaths({ paths: [pathDataSources] }))

      // reset history
      dispatch(DataActions.resetHistory())
    }
  }, [dispatch, location.pathname])
}
