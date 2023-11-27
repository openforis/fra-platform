import './TablePaginated.scss'
import React from 'react'

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
}

const TablePaginated = <Datum extends object>(props: TablePaginatedProps<Datum>) => {
  const { className, columns, header, path, limit, EmptyListComponent } = props

  useFetchData({ path, limit })
  const count = useTablePaginatedCount(path)

  if (count?.total === 0) {
    return (
      <div className={className}>
        <EmptyListComponent />
      </div>
    )
  }

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
  EmptyListComponent: () => <div />,
  className: '',
  header: true,
}

export default TablePaginated
