import './TablePaginated.scss'
import React, { HTMLAttributes } from 'react'
import Skeleton from 'react-loading-skeleton'

import classNames from 'classnames'

import { useTablePaginatedCount } from 'client/store/ui/tablePaginated'
import DataGrid from 'client/components/DataGridDeprecated'
import { PaginatorProps } from 'client/components/Paginator'

import ExportButton from './ExportButton/ExportButton'
import { useFetchData } from './hooks/useFetchData'
import Body from './Body'
import Count from './Count'
import Header from './Header'
import Paginator from './Paginator'
import { Props as BaseProps, TablePaginatedCounter, TablePaginatedSkeleton } from './types'

type Props<Datum extends object> = Pick<HTMLAttributes<HTMLDivElement>, 'className'> &
  Pick<HTMLAttributes<HTMLDivElement>['style'], 'gridTemplateColumns'> &
  Pick<PaginatorProps, 'marginPagesDisplayed' | 'pageRangeDisplayed'> &
  BaseProps<Datum> & {
    counter?: TablePaginatedCounter
    EmptyListComponent?: React.FC
    export?: boolean
    header?: boolean
    skeleton?: TablePaginatedSkeleton
    wrapCells?: boolean
  }

const TablePaginated = <Datum extends object>(props: Props<Datum>) => {
  const { className, gridTemplateColumns } = props // HTMLDivElement Props
  const { marginPagesDisplayed, pageRangeDisplayed } = props // Paginator Props
  const { columns, path, limit } = props // Base Props
  const { counter, EmptyListComponent, export: exportTable, header, skeleton, wrapCells } = props // Component Props

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
      <div>
        {exportTable && <ExportButton path={path} />}
        <DataGrid
          className="table-paginated-datagrid"
          style={{ gridTemplateColumns: gridTemplateColumns ?? `repeat(${columns.length}, auto)` }}
        >
          {header && <Header columns={columns} path={path} />}
          <Body columns={columns} limit={limit} path={path} skeleton={skeleton} wrapCells={wrapCells} />
        </DataGrid>
      </div>

      <Paginator
        limit={limit}
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageRangeDisplayed}
        path={path}
      />

      {counter.show && <Count counter={counter} path={path} />}
    </div>
  )
}

TablePaginated.defaultProps = {
  EmptyListComponent: () => <div />,
  counter: { show: true },
  export: false,
  header: true,
  // eslint-disable-next-line react/default-props-match-prop-types
  limit: 30,
  skeleton: {
    baseColor: 'white',
    highlightColor: 'var(--ui-bg)',
    Component: () => <Skeleton borderRadius="2px" height="20px" width="100%" />,
  },
  wrapCells: true,
}

export default TablePaginated
