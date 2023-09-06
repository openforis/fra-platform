import React from 'react'

import { useTablePaginatedData } from 'client/store/ui/tablePaginated'
import DataColumn from 'client/components/DataGrid/DataColumn'
import { Props } from 'client/components/TablePaginated/types'

const TablePaginatedBody = <Datum extends object>(props: Props<Datum>) => {
  const { columns, path } = props

  const data = useTablePaginatedData<Datum>(path)

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {data?.map((datum, rowIndex) => (
        <React.Fragment
          key={
            // eslint-disable-next-line react/no-array-index-key
            `${rowIndex}_${datum}`
          }
        >
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

export default TablePaginatedBody
