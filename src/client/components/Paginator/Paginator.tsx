import React from 'react'
import ReactPaginate from 'react-paginate'

type Props = {
  className: string
  onPageChange(pageNumber: number): void
  pageCount: number
  pageRangeDisplayed: number
}

const Paginator: React.FC<Props> = ({ className, onPageChange, pageCount, pageRangeDisplayed }) => (
  <ReactPaginate
    className={className}
    breakLabel="..."
    nextLabel=">"
    onPageChange={({ selected: pageNumber }) => onPageChange(pageNumber)}
    pageRangeDisplayed={pageRangeDisplayed}
    pageCount={pageCount}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
)

export default Paginator
