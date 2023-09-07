import './TablePaginated.scss'
import React from 'react'

import DataGrid from 'client/components/DataGrid'

import { useFetchData } from './hooks/useFetchData'
import Body from './Body'
import Count from './Count'
import Header from './Header'
import Paginator from './Paginator'
import { Column, Props } from './types'

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
        <Header columns={columns} />
        <Body columns={columns} path={path} />
      </DataGrid>

      <Paginator path={path} />

      <Count path={path} />
    </div>
  )
}

TablePaginated.defaultProps = {
  className: '',
}

export default TablePaginated
