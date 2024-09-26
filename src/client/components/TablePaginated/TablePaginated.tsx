import './TablePaginated.scss'
import React, { HTMLAttributes } from 'react'
import Skeleton from 'react-loading-skeleton'

import classNames from 'classnames'

import { useTablePaginatedCount } from 'client/store/ui/tablePaginated'
import DataGrid from 'client/components/DataGridDeprecated'
import { PaginatorProps } from 'client/components/Paginator'
import Filters from 'client/components/TablePaginated/Filters/Filters'

import ExportButton from './ExportButton/ExportButton'
import { useFetchData } from './hooks/useFetchData'
import Body from './Body'
import Count from './Count'
import EmptyList from './EmptyList'
import Header from './Header'
import Paginator from './Paginator'
import { Props as BaseProps, TablePaginatedCounter, TablePaginatedEmptyList, TablePaginatedSkeleton } from './types'

type Props<Datum extends object> = Pick<HTMLAttributes<HTMLDivElement>, 'className'> &
  Pick<HTMLAttributes<HTMLDivElement>['style'], 'gridTemplateColumns'> &
  Pick<PaginatorProps, 'marginPagesDisplayed' | 'pageRangeDisplayed'> &
  BaseProps<Datum> & {
    counter?: TablePaginatedCounter
    emptyList?: TablePaginatedEmptyList
    export?: boolean
    header?: boolean
    skeleton?: TablePaginatedSkeleton
    wrapCells?: boolean
  }

const TablePaginated = <Datum extends object>(props: Props<Datum>) => {
  const { className, gridTemplateColumns } = props // HTMLDivElement Props
  const { marginPagesDisplayed, pageRangeDisplayed } = props // Paginator Props
  const { columns, filters, limit, path } = props // Base Props
  const { counter, emptyList, export: exportTable, header, skeleton, wrapCells } = props // Component Props

  useFetchData({ path, limit, counter })
  const count = useTablePaginatedCount(path)

  if (count?.total === 0 && !emptyList.showInTable) {
    return (
      <div className={className}>
        <EmptyList />
        {counter.show && <Count counter={counter} path={path} />}
      </div>
    )
  }

  return (
    <div className={classNames('table-paginated', className)}>
      <div>
        <div className="table-paginated-action-buttons-container">
          {exportTable && <ExportButton path={path} />}
          {exportTable && filters.length > 0 && <div className="table-paginated-separator" />}
          {filters.length > 0 && <Filters filters={filters} path={path} />}
        </div>
        <DataGrid
          className="table-paginated-datagrid"
          style={{ gridTemplateColumns: gridTemplateColumns ?? `repeat(${columns.length}, auto)` }}
        >
          {header && <Header columns={columns} path={path} />}
          {count?.total === 0 && <EmptyList Component={emptyList.Component} />}
          {count?.total > 0 && (
            <Body columns={columns} limit={limit} path={path} skeleton={skeleton} wrapCells={wrapCells} />
          )}
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
  counter: { show: true },
  emptyList: {
    showInTable: false,
  },
  export: false,
  // eslint-disable-next-line react/default-props-match-prop-types
  filters: [],
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
