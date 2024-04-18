import React from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'

import classNames from 'classnames'

import { useTablePaginatedData } from 'client/store/ui/tablePaginated'
import DataColumn from 'client/components/DataGridDeprecated/DataColumn'
import { Props as BaseProps, TablePaginatedSkeleton } from 'client/components/TablePaginated/types'

type Props<Datum extends object> = BaseProps<Datum> & {
  limit: number
  wrapCells: boolean
  skeleton: TablePaginatedSkeleton
}

const Body = <Datum extends object>(props: Props<Datum>) => {
  const { columns, limit, path, wrapCells, skeleton } = props

  const data = useTablePaginatedData<Datum>(path)

  if (!data) {
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

  return (
    <>
      {data.map((datum, rowIndex) => (
        <React.Fragment key={`row_${String(rowIndex)}}`}>
          {columns.map((column) => {
            const { component: Component, key } = column

            if (wrapCells) {
              return (
                <DataColumn key={key} className={classNames({ withBorder: rowIndex !== 0 })}>
                  <Component datum={datum} rowIndex={rowIndex} />
                </DataColumn>
              )
            }

            return <Component key={key} datum={datum} rowIndex={rowIndex} />
          })}
        </React.Fragment>
      ))}
    </>
  )
}

export default Body
