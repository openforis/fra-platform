import './TablePaginated.scss'
import React, { HTMLAttributes } from 'react'

import classNames from 'classnames'

import { useTablePaginatedCount } from 'client/store/ui/tablePaginated'
import DataGrid from 'client/components/DataGridDeprecated'
import { PaginatorProps } from 'client/components/Paginator'

import { useFetchData } from './hooks/useFetchData'
import Body from './Body'
import Count from './Count'
import Header from './Header'
import Paginator from './Paginator'
import { Props as BaseProps } from './types'

type Props<Datum extends object> = Pick<HTMLAttributes<HTMLDivElement>, 'className'> &
  Pick<HTMLAttributes<HTMLDivElement>['style'], 'gridTemplateColumns'> &
  Pick<PaginatorProps, 'marginPagesDisplayed' | 'pageRangeDisplayed'> &
  BaseProps<Datum> & {
    EmptyListComponent?: React.FC
    header?: boolean
    counter?: boolean
    wrapCells?: boolean
  }

const TablePaginated = <Datum extends object>(props: Props<Datum>) => {
  const { className, gridTemplateColumns } = props // HTMLDivElement Props
  const { marginPagesDisplayed, pageRangeDisplayed } = props // Paginator Props
  const { columns, path, limit } = props // Base Props
  const { EmptyListComponent, counter, header, wrapCells } = props // Component Props

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
      <DataGrid
        className="table-paginated-datagrid"
        style={{ gridTemplateColumns: gridTemplateColumns ?? `repeat(${columns.length}, auto)` }}
      >
        {header && <Header columns={columns} path={path} />}
        <Body columns={columns} limit={limit} path={path} wrapCells={wrapCells} />
      </DataGrid>

      <Paginator
        limit={limit}
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageRangeDisplayed}
        path={path}
      />

      {counter && <Count path={path} />}
    </div>
  )
}

TablePaginated.defaultProps = {
  EmptyListComponent: () => <div />,
  header: true,
  // eslint-disable-next-line react/default-props-match-prop-types
  limit: 30,
  counter: true,
  wrapCells: true,
}

export default TablePaginated
