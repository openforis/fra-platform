import React from 'react'
import ReactPaginate, { ReactPaginateProps } from 'react-paginate'

export type PaginatorProps = Pick<
  ReactPaginateProps,
  'forcePage' | 'marginPagesDisplayed' | 'pageCount' | 'pageRangeDisplayed'
> & {
  className: string
  onPageChange(pageNumber: number): void
}

const Paginator: React.FC<PaginatorProps> = (props: PaginatorProps) => {
  const { className, forcePage, marginPagesDisplayed, onPageChange, pageCount, pageRangeDisplayed } = props

  return (
    <ReactPaginate
      breakLabel="..."
      className={className}
      forcePage={forcePage}
      marginPagesDisplayed={marginPagesDisplayed}
      nextLabel=">"
      onPageChange={({ selected: pageNumber }) => onPageChange(pageNumber)}
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
}

export default Paginator
