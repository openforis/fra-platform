import React from 'react'

import { useTablePaginatedCount, useTablePaginatedData } from 'client/store/ui/tablePaginated'
import { limit } from 'client/store/ui/tablePaginated/constants'
import DataColumn from 'client/components/DataGrid/DataColumn'
import { Props } from 'client/components/TablePaginated/types'

const Body = <Datum extends object>(props: Props<Datum>) => {
  const { columns, path } = props

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

            return (
              <DataColumn key={key}>
                <Component datum={datum} />
              </DataColumn>
            )
          })}
        </React.Fragment>
      ))}
    </>
  )
}

export default Body
