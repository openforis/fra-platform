import './Paginator.scss'
import React, { useCallback } from 'react'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions, useTablePaginatedCount, useTablePaginatedPage } from 'client/store/ui/tablePaginated'
import { limit } from 'client/store/ui/tablePaginated/constants'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import PaginatorComponent from 'client/components/Paginator'
import { DOMs } from 'client/utils/dom'

type Props = { path: string }

const Paginator = (props: Props) => {
  const { path } = props

  const dispatch = useAppDispatch()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const page = useTablePaginatedPage(path)
  const counts = useTablePaginatedCount(path)

  const onPageChange = useCallback(
    (page: number) => {
      // update page number
      dispatch(TablePaginatedActions.setPage({ assessmentName, cycleName, page, path }))
      DOMs.scrollTo()
    },
    [assessmentName, cycleName, dispatch, path]
  )

  if (!counts?.total) return null

  return (
    <PaginatorComponent
      className="table-paginated-paginator"
      forcePage={page}
      onPageChange={onPageChange}
      pageRangeDisplayed={5}
      pageCount={Math.ceil(counts.total / limit)}
    />
  )
}
export default Paginator
