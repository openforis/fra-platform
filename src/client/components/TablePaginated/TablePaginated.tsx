import './TablePaginated.scss'
import React from 'react'

import classNames from 'classnames'

import { useTablePaginatedCount } from 'client/store/ui/tablePaginated'
import DataGrid from 'client/components/DataGridDeprecated'

import { useFetchData } from './hooks/useFetchData'
import Body from './Body'
import Count from './Count'
import Header from './Header'
import Paginator from './Paginator'
import { Props } from './types'

type TablePaginatedProps<Datum extends object> = Props<Datum> & {
  EmptyListComponent?: React.FC
  className?: string
  header?: boolean
  counter?: boolean
}

const TablePaginated = <Datum extends object>(props: TablePaginatedProps<Datum>) => {
  const { className, columns, header, counter, path, limit, EmptyListComponent } = props

  useFetchData({ path, limit, counter })
  const count = useTablePaginatedCount(path)

  if (count?.total === 0) {
    return (
      <div className={className}>
        <EmptyListComponent />
      </div>
    )
  }

  return (
    <div className={classNames('table-paginated', className)}>
      <DataGrid className="table-paginated-datagrid" style={{ gridTemplateColumns: `repeat(${columns.length}, auto)` }}>
        {header && <Header columns={columns} path={path} />}
        <Body columns={columns} path={path} />
      </DataGrid>

      <Paginator path={path} />

      {counter && <Count path={path} />}
    </div>
  )
}

TablePaginated.defaultProps = {
  EmptyListComponent: () => <div />,
  className: '',
  header: true,
  counter: true,
}

export default TablePaginated
