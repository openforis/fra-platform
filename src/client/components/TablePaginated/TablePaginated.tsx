import './TablePaginated.scss'
import React from 'react'

import DataGrid from 'client/components/DataGrid'

import { useFetchData } from './hooks/useFetchData'
import Body from './Body'
import Count from './Count'
import Header from './Header'
import Paginator from './Paginator'
import { Props } from './types'

type TablePaginatedProps<Datum extends object> = Props<Datum> & { className?: string; header?: boolean }
const TablePaginated = <Datum extends object>(props: TablePaginatedProps<Datum>) => {
  const { className, columns, header, path, params } = props

  useFetchData({ path, params })

  return (
    <div className={className}>
      <DataGrid className="table-paginated-datagrid" style={{ gridTemplateColumns: `repeat(${columns.length}, auto)` }}>
        {header && <Header columns={columns} path={path} />}
        <Body columns={columns} path={path} />
      </DataGrid>

      <Paginator path={path} />

      <Count path={path} />
    </div>
  )
}

TablePaginated.defaultProps = {
  className: '',
  header: true,
}

export default TablePaginated
