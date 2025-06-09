import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { HistoryActions } from 'client/store/data/history/actions'
import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'

export const useResetHistory = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      // reset table paginated data. add all supported items here
      const pathDataSources = ApiEndPoint.CycleData.History.Activities.one(CommentableDescriptionName.dataSources)
      dispatch(TablePaginatedActions.resetPaths({ paths: [pathDataSources] }))

      // reset history
      dispatch(HistoryActions.resetActivities())
    }
  }, [dispatch, location.pathname])
}
