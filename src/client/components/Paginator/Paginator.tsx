import React from 'react'
import ReactPaginate from 'react-paginate'

type Props = {
  className: string
  onPageChange?(selectedItem: { selected: number }): void
  pageCount: number
  pageRangeDisplayed: number
}

const Paginator: React.FC<Props> = ({ className, onPageChange, pageCount, pageRangeDisplayed }) => (
  <ReactPaginate
    className={className}
    breakLabel="..."
    nextLabel=">"
    onPageChange={onPageChange}
    pageRangeDisplayed={pageRangeDisplayed}
    pageCount={pageCount}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
)

Paginator.defaultProps = {
  onPageChange: () => null,
}

export default Paginator
