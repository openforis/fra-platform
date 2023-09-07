import './TablePaginated.scss'
import React from 'react'

import DataGrid from 'client/components/DataGrid'

import { useFetchData } from './hooks/useFetchData'
import Body from './Body'
import Count from './Count'
import Header from './Header'
import Paginator from './Paginator'
import { Props } from './types'

const TablePaginated = <Datum extends object>(props: Props<Datum> & { className?: string }) => {
  const { columns, path, className } = props

  useFetchData({ path })

  return (
    <div className={className}>
      <DataGrid className="table-paginated-datagrid" style={{ gridTemplateColumns: `repeat(${columns.length}, auto)` }}>
        <Header columns={columns} path={path} />
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
