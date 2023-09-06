import './TablePaginated.scss'
import React from 'react'

import DataGrid from 'client/components/DataGrid'
import { useFetchData } from 'client/components/TablePaginated/hooks/useFetchData'
import { Column, Props } from 'client/components/TablePaginated/types'

import TablePaginatedBody from './components/TablePaginatedBody'
import TablePaginatedCount from './components/TablePaginatedCount'
import TablePaginatedHeader from './components/TablePaginatedHeader'

export type PropsHeader<Datum> = {
  columns: Array<Column<Datum>>
  className?: string
}

const TablePaginated = <Datum extends object>(props: Props<Datum> & { className?: string }) => {
  const { columns, path, className } = props

  useFetchData({ path })

  return (
    <div className={className}>
      <DataGrid className="table-paginated-datagrid" style={{ gridTemplateColumns: `repeat(${columns.length}, auto)` }}>
        <TablePaginatedHeader columns={columns} />
        <TablePaginatedBody columns={columns} path={path} />
      </DataGrid>

      {/* <TablePaginatedPaginator path={path} /> */}

      <TablePaginatedCount path={path} />
    </div>
  )
}

TablePaginated.defaultProps = {
  className: '',
}

export default TablePaginated
