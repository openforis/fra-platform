import React from 'react'

import classNames from 'classnames'

import { useTablePaginatedCount, useTablePaginatedData } from 'client/store/ui/tablePaginated'
import DataColumn from 'client/components/DataGridDeprecated/DataColumn'
import { Props as BaseProps } from 'client/components/TablePaginated/types'

type Props<Datum extends object> = BaseProps<Datum> & {
  limit: number
  wrapCells: boolean
}

const Body = <Datum extends object>(props: Props<Datum>) => {
  const { columns, limit, path, wrapCells } = props

  const data = useTablePaginatedData<Datum>(path)
  const count = useTablePaginatedCount(path)

  // TODO: add skeleton
  if (count?.total && !data) {
    // 38 is the height of each row
    return <div style={{ height: `${38 * limit}px` }} />
  }

  if (!data) return null

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
