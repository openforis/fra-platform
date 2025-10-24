import './Paginator.scss'
import React, { useCallback } from 'react'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useTablePaginatedCount, useTablePaginatedPage } from 'client/store/tablePaginated/hooks/tablePaginated'
import ReactPaginator, { PaginatorProps } from 'client/components/TablePaginated/Paginator/ReactPaginator'
import { DOMs } from 'client/utils/dom'

type Props = Pick<PaginatorProps, 'marginPagesDisplayed' | 'pageRangeDisplayed'> & {
  limit: number
  path: string
}

const Paginator: React.FC<Props> = (props) => {
  const { limit, marginPagesDisplayed, pageRangeDisplayed, path } = props

  const dispatch = useAppDispatch()
  const page = useTablePaginatedPage(path)
  const counts = useTablePaginatedCount(path)

  const onPageChange = useCallback(
    (page: number) => {
      // update page number
      dispatch(TablePaginatedActions.setPage({ page, path }))
      DOMs.scrollTo()
    },
    [dispatch, path]
  )

  if (!counts?.total) return null

  return (
    <ReactPaginator
      className="table-paginated-paginator"
      forcePage={page}
      marginPagesDisplayed={marginPagesDisplayed}
      onPageChange={onPageChange}
      pageCount={Math.ceil(counts.total / limit)}
      pageRangeDisplayed={pageRangeDisplayed ?? 5}
    />
  )
}
export default Paginator
