import React from 'react'
import ReactPaginate from 'react-paginate'

type Props = {
  className: string
  forcePage?: number
  onPageChange(pageNumber: number): void
  pageCount: number
  pageRangeDisplayed: number
}

const Paginator: React.FC<Props> = (props: Props) => {
  const { className, forcePage, onPageChange, pageCount, pageRangeDisplayed } = props

  return (
    <ReactPaginate
      className={className}
      breakLabel="..."
      nextLabel=">"
      onPageChange={({ selected: pageNumber }) => onPageChange(pageNumber)}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      forcePage={forcePage}
    />
  )
}

Paginator.defaultProps = {
  forcePage: undefined,
}

export default Paginator
