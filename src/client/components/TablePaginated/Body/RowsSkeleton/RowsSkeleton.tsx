import React from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

import { Column, TablePaginatedSkeleton } from 'client/components/TablePaginated/types'

type Props = {
  columns: Array<Column<unknown>>
  limit: number
  skeleton: TablePaginatedSkeleton
}

const RowsSkeleton: React.FC<Props> = (props) => {
  const { columns, limit, skeleton } = props
  const { baseColor, highlightColor, Component } = skeleton

  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor} inline>
      {Array.from(Array(limit).keys()).map((i) => {
        return (
          <React.Fragment key={`row-skeleton-${String(i)}`}>
            {columns.map((column) => (
              <Component key={column.key} />
            ))}
          </React.Fragment>
        )
      })}
    </SkeletonTheme>
  )
}

export default RowsSkeleton
